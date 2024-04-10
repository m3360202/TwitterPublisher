import { useBasicSettings, useRequest, useKt, useLinks } from "../store/paperSettings";
import { generateRandomId } from './utils';
import { text1, text2, text3, text4 } from "./articles/0402";
import axios from 'axios';

export function generateLinksContent() {
    const { links } = useLinks.getState();
    if (links.length === 0) {
        return '';
    }
    else {
        let content = '\n 论文写作进度计划与参考文献：\n';
        links.forEach((link, index) => {
            let type = '';
            if (link.dBFrom === '期刊') {
                type = 'J';
            }
            if (link.dBFrom === '硕士') {
                type = 'D';
            }
            content = content + `[${index + 1}]${link.author} ${link.title}[${type}].${link.publicationTime}\n`;
        });
        return content;
    }
}

function getPersoan() {
    const { course, subject, school } = useBasicSettings.getState();

    return [{
        role: 'user',
        content: `你是一个学术优秀的，来自${school}的${course}-${subject}专业教授，现在你将为一个该专业的你的学生做毕业论文的生成指导，他会给你提供论文的选题，背景，行业，摘要等`,
    }, {
        role: 'assistant',
        content: 'roger'
    }];
}

function createPrompt() {

    const { titleResult } = useRequest.getState();
    const { step, prompt, process } = useKt.getState();

    const getText = (process) => {
        let text;
        let info = '';
        let index = 0;
        if (process === 1) { text = text1; info = '研究背景'; index = 0; }
        if (process === 2) { text = text2; info = '研究问题'; index = 1; }
        if (process === 3) { text = text3; info = '研究意义'; index = 2; }
        if (process === 4) { text = text4; info = '研究方法'; index = 3; }
        if (step === 1) {
            console.log('test1:', process, index)
            if (process === 1) {
                let linkGroup = useKt.getState().linkGroup;
                if (linkGroup.length > 0) {
                    const linkContent = summaryLink(linkGroup);
                    return `\n
                    以下是一个论文的${info}：“${text}”，
                    请将以下文献： ${linkContent}"，
                    请将文本中所有引用的文献或材料替换为上述指定的文献内容并加以润色，例如：“赵琦在《精彩的“过渡”——浅谈大班幼儿“过渡环节”的组织》一文中指出，幼儿园大班儿童的规则意识逐步形成，他们开始学习着控制自己的行为，遵守集体的一些共同规则。”，
                    请基于原文本的长度和质量基础上，做一个文本的填充的扩写，
                    请帮我把这段文本作为论文的${info}翻译成准确的英文,请直接提供翻译后的内容，无需任何额外的介绍或填充语。`;
                } else {
                    return `
                    以下是一个论文的${info}：“${text}”
                    请根据上述文本，请帮我把这段文本作为论文的${info}翻译成准确的英文,请直接提供翻译后的内容，无需任何额外的介绍或填充语。
                    `;
                }

            } else {
                return `
                以下是一个论文的${info}：“${text}”
                请根据上述文本，请帮我把这段文本作为论文的${info}翻译成准确的英文,请直接提供翻译后的内容，无需任何额外的介绍或填充语。
                `;
            }

        }
        else if (step === 2) {
            console.log('test2:', process, index)
            return `
            请根据上述${info}，在保持语言结构和内容结构的同时，将上述英文翻译结果改写成《${titleResult}》这一选题的${info}，请在译文原有基础上进行内容的改变和扩写，请注意逻辑通顺，语句通顺,请直接提供编写后的内容，无需任何额外的介绍或填充语，请保证你得扩写文本长度大于元文本长度。
            `;
        }
        else if (step === 3) {
            console.log('test3:', process, index)
            return `
            请把你上述的英文文章转译成中文，并进行文本润色，注意论文降重,请直接提供翻译后的内容，无需任何额外的介绍或填充语。
            `;
        }
    }
    let text = getText(process);

    if (prompt.length > 0) {
        text = text + `，${prompt}`;
    }
    return {
        role: 'user',
        content: text,
    }
}

function createPromptForResult() {

    let linkGroup = useKt.getState().linkGroup;
    let content = useKt.getState().content;
    let text = `以下是论文的开题报告：“${content}”，`;

    if (prompt.length > 0) {
        text = text + `，${prompt}`;
    }

    if (linkGroup.length > 0) {
        const linkContent = summaryLink(linkGroup);
        text = text + `\n请将以下文献 ${linkContent}"，
        在开题报告的正文合适位置进行文本填充，
        其中研究方法不必使用，
        请务必保证原文本的长度和质量不变，只是做一个文本的填充的扩写，
        请注意文献标题的书名号等，请返回填充以后的内容，无需任何额外的介绍或填充语。`;
    }
    return [{
        role: 'user',
        content: text,
    }]
}

function summaryLink(links) {
    let text = '';
    links.map((link) => {
        text = text + `作者：${link.author} 文献标题：${link.title}的摘要:"${link.summary}"，`;
    });
    return text;
}

function reRenderPrompt() {

    const { prompt } = useKt.getState();
    return {
        role: 'user',
        content: prompt,
    }

}

export async function handleGeneralKt(chat, model, temperature = 0.1) {
    return new Promise(async (resolve, reject) => {

        const { chat, process, step, prompt } = useKt.getState();

        let modelEndpoint = 'https://gpt4server.zeabur.app/handleRequestGPT4';
        let newPrompt = chat;

        if (prompt.length === 0 && chat.length === 0) {
            let extPrompt = createPrompt();
            //add persona
            const prePersona = getPersoan();
            newPrompt = [...prePersona, extPrompt];
        }
        if (prompt.length === 0 && chat.length > 0) {
            let extPrompt = createPrompt();

            newPrompt = [...chat, extPrompt];
        }
        if (prompt.length > 0) {
            newPrompt = [...chat, reRenderPrompt()];
        }


        //use GML4V
        let requestData = {
            prompt: newPrompt,
            top_p: 0.1,
            temperature: 0.1,
            sessionId: generateRandomId()
        };

        axios.post(modelEndpoint, requestData, {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((response) => {

            let data = response.data.choices[0].message.content;
            if (process === 3) {
                const getLinks = generateLinksContent();
                data = data + getLinks;
            }
            let content = useKt.getState().content;
            const repeat = {
                role: 'assistant',
                content: data
            }
            if (step !== 3) {
                newPrompt = [...newPrompt, repeat];
            } else {
                newPrompt = [];
            }

            useKt.setState({
                content: step === 3 ? content + '\n' + data : content,
                process: step === 3 ? process + 1 : process,
                step: step === 3 ? 1 : step + 1,
                chat: newPrompt,
                prompt: '',
                linkGroup: step === 3 ? [] : useKt.getState().linkGroup,
            });
            resolve(data);
        }).catch((error) => {
            console.log('error:', error);
            reject(error);
        });
    });

}
// export async function handleGeneralKtResult(chat, model, temperature = 0.1) {
//     return new Promise(async (resolve, reject) => {

//         const { chat, process, step, prompt } = useKt.getState();

//         let modelEndpoint = 'https://gpt4server.zeabur.app/handleRequestGPT4';

//         let newPrompt = createPromptForResult();

//         //use GML4V
//         let requestData = {
//             prompt: newPrompt,
//             top_p: 0.1,
//             temperature: 0.1,
//             sessionId: generateRandomId()
//         };

//         axios.post(modelEndpoint, requestData, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }

//         }).then((response) => {

//             let data = response.data.choices[0].message.content;

//             useKt.setState({ content: content + '\n'+data, });
//             resolve(data);
//         }).catch((error) => {
//             console.log('error:', error);
//             reject(error);
//         });
//     });

// }
