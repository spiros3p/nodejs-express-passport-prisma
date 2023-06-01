import { User } from '@prisma/client';

export function removePasswordFromMany(
    users: Array<Partial<User>> | []
): Array<Omit<Partial<User>, 'password'>> | [] {
    if (!users) return [];
    for (const user of users) {
        delete user['password'];
    }
    return users;
}

export function removePasswordFromSingle(
    user: Partial<User> | null
): Omit<Partial<User>, 'password'> | null {
    if (!user) return null;
    delete user['password'];
    return user;
}
