export default interface TodoModel {
	id: string
	title: string
	completed: boolean
	uid: string
	description?: string
	dueDate: string
	isUrgent: boolean
}
