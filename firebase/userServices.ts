import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup
} from 'firebase/auth'
import { auth } from './firebase'
import UserModel from '@/app/models/userModel'

export const loginUser = async (email: string, password: string) => {
	if (!email || !password) return new Error('Please fill out all fields')
	try {
		let user = null as UserModel | null
		await signInWithEmailAndPassword(auth, email, password).then(
			(userCredential) => {
				user = {
					uid: userCredential.user.uid,
					email: userCredential.user.email,
					userName: userCredential.user.displayName
				} as unknown as UserModel
			}
		)

		return user
	} catch (error: any) {
		return new Error(error)
	}
}

export const loginUserWithGoogle = async () => {
	const authProvider = new GoogleAuthProvider()
	authProvider.setCustomParameters({
		prompt: "select_account"
	})
	try {
		let user = null as UserModel | null
		return await signInWithPopup(auth, authProvider).then((result) => {
			user = {
				uid: result.user.uid,
				email: result.user.email,
				userName: result.user.displayName || result.user.email!.split('@')[0]
			} as unknown as UserModel

			return user
		})
	} catch (error: any) {
		return new Error(error)
	}
}

export const signUpUser = async (
	email: string,
	password: string,
	userName: string
) => {
	if (!email || !password || !userName)
		return new Error('Please fill out all fields')
	try {
		let user = null as UserModel | null
		await createUserWithEmailAndPassword(auth, email, password).then(
			(userCredential) => {
				user = {
					uid: userCredential.user.uid,
					email: userCredential.user.email,
					userName: userCredential.user.displayName || userName
				} as unknown as UserModel
			}
		)

		return user
	} catch (error: any) {
		return new Error(error)
	}
}

export const signOutUser = async () => {
	try {
		await auth.signOut()
	} catch (error: any) {
		return new Error(error)
	}
}
