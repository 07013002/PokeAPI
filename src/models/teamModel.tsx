import connection from './connection';

const getAllTeam = async (): Promise<any> => {
    const [rows] = await connection.execute('SELECT * FROM team');
    return rows;
}

export {
    getAllTeam
};