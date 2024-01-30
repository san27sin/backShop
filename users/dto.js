export class PayloadUserDto {

    static returnPayload(user) {
        return {
            id: user.id,
            email: user.email,
            nickname: user.nickname
        }
    }
}