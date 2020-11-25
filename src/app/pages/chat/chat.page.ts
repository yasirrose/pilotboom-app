import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent } from '@ionic/angular';
import { ChatMessage, ChatService, UserInfo } from 'src/app/services/chat.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

	@ViewChild(IonContent) content: IonContent;

	msgsList: ChatMessage[] = [];
	user: UserInfo;
	toUser: UserInfo;
	textMsg = '';
	showEmojiPicker = false;
	contactData: any;
	user_id = this.rest.getCurrentUserID();

	constructor(
		private chatService: ChatService,
		private global: GlobalService,
		private rest: RestService,
		private router: Router,
		private route: ActivatedRoute,
		private alertCtrl: AlertController,
	) {
		this.route.queryParams.subscribe(params => {
			if (params) {
				this.contactData = params;
			}
		});
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.global.showLoading("bubbles", "Please wait...");
		this.getContactChat();
	}

	scrollToBottom(delay = 300) {
		setTimeout(() => {
			if (this.content.scrollToBottom) {
				this.content.scrollToBottom();
			}
		}, delay)
	}

	pushMessage() {
		var msg = [];
		msg['status'] = 'send';
		msg['avatar'] = 'assets/img/user-comment-img-01.png';
		msg['time'] = 'Luff over 3 years ago';
		msg['text'] = '	Hello, hope you are doing great. I want to meet you soon.';
		// this.msgsList.push(msg);
		this.scrollToBottom();
	}

	receiveMessage() {
		var msg = [];
		msg['status'] = 'receive';
		msg['avatar'] = 'assets/img/user-comment-img-01.png';
		msg['time'] = 'Anna over 3 years ago';
		msg['text'] = 'Hi, I\'m great, Yes I will meet you as soon I get free.';
		// this.msgsList.push(msg);
		this.scrollToBottom();
	}

	// getMsg() {
	// 	// Get mock message list
	// 	return this.chatService
	// 		.getMsgList()
	// 		.subscribe(res => {
	// 			this.msgsList = res;
	// 			this.scrollToBottom();
	// 		});
	// }

	sendMsg() {
		this.textMsg = this.textMsg.trim();
		if (!this.textMsg) {
			return;
		}
		const id = Date.now().toString();
		let newMsg = this.getNewMsg(this.textMsg, id);
		this.pushNewMsg(newMsg);
		this.textMsg = '';

		// if (!this.showEmojiPicker) {
		// 	this.focus();
		// }

		this.chatService.sendMsg(newMsg).subscribe(
			res => {
				let rest: any = res;
				let index = this.getMsgIndexById(id);
				if (index !== -1) {
					this.msgsList[index].status = 'success';
					this.msgsList[index].id = rest.msg_id;
				}
			},
			err => {
				let index = this.getMsgIndexById(id);
				if (index !== -1) {
					this.msgsList[index].status = 'failed';
					this.msgsList[index].id = err.error.msg_id;
				}
				this.processError(err);
			}
		);
	}

	pushNewMsg(msg: ChatMessage) {
		// 	toUserId = this.toUser.id;
		// // Verify user relationships
		// if (msg.userId === userId && msg.toUserId === toUserId) {
		// 	this.msgsList.push(msg);
		// } else if (msg.toUserId === userId && msg.userId === toUserId) {
		// 	this.msgsList.push(msg);
		// }

		this.msgsList.push(msg);
		this.scrollToBottom();
	}

	getMsgIndexById(id: string) {
		return this.msgsList.findIndex(e => e.messageTempId === id)
	}

	// private focus() {
	// 	if (this.messageInput && this.messageInput.nativeElement) {
	// 		this.messageInput.nativeElement.focus();
	// 	}
	// }

	// private setTextareaScroll() {
	// 	const textarea = this.messageInput.nativeElement;
	// 	textarea.scrollTop = textarea.scrollHeight;
	// }

	getNewMsg(text, tempId) {
		const mockMsg: ChatMessage = {
			id: null,
			messageTempId: tempId,
			user_id: this.user_id,
			phone: this.contactData.phone,
			contact_id: this.contactData.id,
			time: Date.now(),
			text: text,
			status: 'pending',
			type: 'send'
		};
		return mockMsg;
	}

	processError(err) {
		if (err.error.errorCode == 21211) {
			err.error.message = 'Invalid recipient phone number.'
		}
		this.global.checkErrorStatus(err);
	}

	getContactChat(event?, refresh?) {
		this.chatService.getChat(this.user_id, this.contactData.id).subscribe(
			res => {
				this.scrollToBottom(0);
				this.msgsList = this.msgsList.concat(res);
				this.msgsList = res;

				event ? event.target.complete() : '';
				this.global.closeLoading();
				
				// this.loadView = true;
			},
			err => {
				event ? event.target.complete() : '';
				this.global.checkErrorStatus(err);
			}
		);
	}

	async resendMsg(id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Resend',
			message: 'Do you want to resend this message?',
			buttons: [
				{
					text: 'No',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: 'Yes',
					handler: () => {
						let index = this.msgsList.findIndex(e => e.id === id);
						console.log('Index = ', index);
						this.msgsList[index].status = 'pending';
						this.chatService.resendMsg(id).subscribe(
							res => {
								this.msgsList[index].status = 'success';
							},
							err => {
								this.msgsList[index].status = 'failed';
								this.processError(err);
							}
						);
					}
				}
			]
		});
		await alert.present();
	}
}