import {
  AfterContentChecked,
  AfterViewInit, Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Goal} from "../../../shared/models/goal.model";
import {AuthService} from "../../../shared/services/auth.service";
import {Company} from "../../../shared/models/company.model";
import {GoalsTypesEnum} from "../../../shared/enum/goals-types.enum";
import {getEnumDescription} from "../../../shared/utils/enum-helper";
import {Likes} from "../../../shared/models/likes.model";
import {GoalsService} from "../../../shared/services/goals.service";
import {GoalsStatusEnum} from "../../../shared/enum/goals-status.enum";
import {GoalComment} from "../../../shared/models/goal-comment.model";
import {sortBy} from "../../../shared/utils/collection-helper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-goal-block',
  templateUrl: './goal-block.component.html',
  styleUrls: ['../goals.component.less']
})
export class GoalBlockComponent implements OnInit, AfterContentChecked {
  isShowMenu: boolean = false;
  isWrongUrlImg: boolean = true;
  isOpenAccessPopup: boolean = false;
  commentText: string = '';
  like: number;
  dislike: number;
  myCompany: Company;
  @Output() onEditGoalEvent = new EventEmitter;
  @Output() onEditStatusGoalEvent = new EventEmitter;
  @Input() goal: Goal;
  @Input() company: Company;
  @Input() number: number;
  @Input() isOwnPage: boolean;
  @ViewChild('commentsWrap', {static: false}) commentsWrap: ElementRef;

  constructor(private readonly authService: AuthService,
              private readonly  goalsService: GoalsService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.setLikes();
    this.myCompany =this.authService.getCompany();
  }

  ngAfterContentChecked() {
    this.scrollToBottom();
    this.checkDeadline();
  }

  onAddLike(type: boolean): void {
    if (!this.goal.likes) {
      this.goal = {
        ...this.goal,
        likes: []
      }
    }

    const companyId = this.myCompany.id;
    const likeIndex = this.goal.likes.findIndex(l => l.id === companyId);
    const goalsLike = (type
      ? {id: companyId, positive: 1, negative: 0}
      : {id: companyId, positive: 0, negative: 1}) as Likes;

    if(likeIndex === -1) {
      this.goal.likes.push(goalsLike);
    } else {
      this.goal.likes[likeIndex] = goalsLike;
    }

    this.goalsService.setGoal(this.company, this.goal);
    this.setLikes();
  }

  onEditGoal(goal: Goal): void {
    this.onEditGoalEvent.emit(goal);
    this.isShowMenu = false;
  }

  onPerformAction(): void {
    this.isOpenAccessPopup = !this.isOpenAccessPopup;
  }

  onLoginEvent(): void {
    this.router.navigate(['/authorization']);
  }

  onChangeStatus(status: GoalsStatusEnum): void {
    this.goal.status = status;
    this.isShowMenu = false;
    this.goalsService.setGoal(this.company, this.goal);
    this.onEditStatusGoalEvent.emit();
  }

  onSendComment(): void {
    if (!this.commentText.length) {
      return;
    }

    const comment = {
      text: this.commentText,
      companyCreator: {
        id: this.myCompany.id,
        name: this.myCompany.name,
        img: this.myCompany.img,
      },
      date: new Date
    } as GoalComment;

    this.goalsService.setGoal(this.company, this.goal, comment);
    this.commentText = '';
    this.scrollToBottom();
  }

  setLikes(): void {
    if(!this.goal.likes) {
      return;
    }

    this.like = this.goal.likes.filter(l => l.positive).length;
    this.dislike = this.goal.likes.filter(l => l.negative).length;
  }

  checkDeadline(): void {
    if(this.goal
      && this.goal.status === GoalsStatusEnum.New
      && new Date(this.goal.deadline) <= new Date()) {
      this.goal.status = GoalsStatusEnum.Reject;
      this.goalsService.setGoal(this.company, this.goal);
    }
  }

  scrollToBottom(): void {
    try {
      this.commentsWrap.nativeElement.scrollTop = this.commentsWrap.nativeElement.scrollHeight + 50;
    } catch (err) {}
  }

  getTimeComment(comment: GoalComment): string {
    return `${new Date(comment.date).getHours()}:${new Date(comment.date).getMinutes()} | `;
  }

  getWidthTimeline(goal: Goal): string {
    if (this.goal.status === GoalsStatusEnum.Complete
    || this.goal.status === GoalsStatusEnum.Reject) {
      return 100 + '%';
    }
    const allTime =  new Date(goal.deadline).getTime() - new Date(goal.createdDate).getTime();
    const pastTime = new Date().getTime() - new Date(goal.createdDate).getTime();
    return Math.ceil((pastTime * 100) / allTime) + '%';
  }

  getDescriptionType(type: GoalsTypesEnum): string {
    return getEnumDescription(type, GoalsTypesEnum);
  }

  getDescriptionStatus(status: GoalsStatusEnum): string {
    return getEnumDescription(status, GoalsStatusEnum);
  }

  getIsOwnComment(comment: GoalComment): boolean {
    if(!this.myCompany) {
      return false;
    }

    return comment.companyCreator.id === this.myCompany.id;
  }

  getIsFirstComment(comment: GoalComment): boolean {
    const filterComment = sortBy(this.goal.comments, 'date');
    const commentIndex = filterComment.findIndex(c => c.id === comment.id);
    if(!commentIndex) {
      return true;
    }
    return filterComment[commentIndex - 1].companyCreator.id !== comment.companyCreator.id;
  }

  get isUnregistered(): boolean {
    return !this.authService.getCompany();
  }
}
