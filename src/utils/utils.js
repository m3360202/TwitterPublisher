;
import { useActions } from '../store/uiActions';
import axios from 'axios';

export function generateRandomId() {
    var d = new Date().getTime();

    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });

    return uuid;
}

export function getRandomId() {
    //生成7位随机大小写字母的字符串并返回
    return Math.random().toString(36).substr(2, 7);
}

// export function handleTasks() {
//     useActions.setState({ taskState: 1 });
//     let taskItems = [...useTodoList.getState().todoList[0].todu];
//     console.log('cccccccccccccc', taskItems);
//     taskItems.forEach(async (item) => {
//         if (item.realPlayTime > 0 && item.realPlayTime < item.totalTime) {
//             await axios.post('http://gptserver.xinquji.com/handleRequestRes',
//                 {
//                     Edusign: item.Edusign,
//                     Edutoken: item.Edutoken,
//                     courseVersionId: item.courseVersionId,
//                     userAccountId: item.userAccountId,
//                     sign: item.sign,
//                     studyDuration: 30
//                 })
//         }
//     });
// }

export async function handleTask(index) {

    let taskItems = [...useTodoList.getState().todoList[index].todu];
    //将index的item的state设置为1
    let oldList = useTodoList.getState().todoList;
    useTodoList.setState({ todoList: oldList.map((item, i) => i === index ? { ...item, state: 1 } : item) });

    // 并发处理所有任务项
    const results = await Promise.all(taskItems.map(async item => {
        try {
            // 计算每个item需要调用的次数
            const callTimes = Math.ceil((item.totalTime - item.realPlayTime) * 10);
            for (let i = 0; i < callTimes; i++) {
                // 并发调用接口，不需要等待上一个调用完成
                if(item.realPlayTime > 0 && item.realPlayTime < item.totalTime){
                    await makeRequest(item);
                }
                
            }
            // 更新realPlayTime
            useActions.setState({
                realPlayTimeSum: useActions.getState().realPlayTimeSum + callTimes * 0.3
            });
            return item; // 返回更新后的item
        } catch (error) {
            console.error('Error processing task:', error);
            // 可以选择抛出错误或者返回一个标记错误的item
            throw error; // 如果你想中断所有任务处理，可以在这里抛出错误
        }
    }));

    // 返回所有处理过的任务项
    return results;
}

async function makeRequest(item) {
    try {
        const response = await axios.post('http://gptserver.xinquji.com/handleRequestTask', item);
        return response.data; // 假设服务器返回的数据在 response.data 中
    } catch (error) {
        console.error('Request failed for item:', item, error);
        throw error; // 重新抛出错误，让调用者知道请求失败
    }
}