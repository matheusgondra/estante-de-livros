export class UserErrorController extends Error {
	public readonly statusCode;

	constructor(msg: string, statusCode: number) {
		super(msg);
		this.message = msg;
		this.statusCode = statusCode;
	}
}