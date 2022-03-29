import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Nguyễn Ngọc Phú Sỹ',
        email: 'sy@admin.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Nguyễn Ngọc Phú Quý',
        email: 'quy@user.com',
        password:  bcrypt.hashSync('123456',10),
        isAdmin: false
    },
    {
        name: 'Trần Tiểu Ngọc',
        email: 'ngoc@user.com',
        password:  bcrypt.hashSync('123456',10),
        isAdmin: false
    }
];

export default users