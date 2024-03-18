import TodoModel from '@/app/models/todoModel'
import { getDocs, query, setDoc, where, collection } from 'firebase/firestore'
import { db } from './firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export const getTodos = async (uid: string) => {
	const todos: TodoModel[] = []
	const docRef = collection(db, 'todos')
	const q = query(docRef, where('uid', '==', uid))
	await getDocs(q).then((querySnapshot) => {
		if (querySnapshot.empty) {
			return []
		}

		querySnapshot.forEach((doc) => {
			todos.push(doc.data() as TodoModel)
		})
	})

	return todos
}

export const addTodo = async (todo: TodoModel) => {
	return await setDoc(doc(db, 'todos', todo.id), todo).then(() => {
		return todo
	})
}

export const removeTodo = async (id: string) => {
	await deleteDoc(doc(db, 'todos', id))
}

export const updateTodo = async (id: string, todo: TodoModel) => {
	return await setDoc(doc(db, 'todos', id), todo).then(() => {
		return todo
	})
}
