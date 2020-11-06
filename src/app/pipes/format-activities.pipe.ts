import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatActivities'
})
export class FormatActivitiesPipe implements PipeTransform {

	transform(value: any, groupByKey: string) {
		const events: any[] = [];
		const groupedElements: any = {};

		value.forEach((obj: any) => {
			if (!(obj[groupByKey] in groupedElements)) {
				groupedElements[obj[groupByKey]] = [];
			}

			obj.start_date_on = !obj.start_date ? '' : ' on ' + obj.start_date;

			if (obj.type == 'new_note') {
				obj.activity = ' created a note ';
			} else if (obj.type == 'tasks') {
				obj.activity = ' created a task ';
			} else if (obj.type == 'email') {
				obj.activity = ' sent an email ';
			} else if (obj.type == 'log_activity') {
				obj.activity = ` logged a ${obj.log_type} `;
			} else {
				obj.activity = ` logged a ${obj.log_type} `;
			}

			groupedElements[obj[groupByKey]].push(obj);
		});

		for (let prop in groupedElements) {
			if (groupedElements.hasOwnProperty(prop)) {
				events.push({
					month_year: prop,
					list: groupedElements[prop]
				});
			}
		}
		return events;
	}
}
