import { useBasicSettings, useRequest, useSummary, useDirectory, useLinks, useContent } from "../store/paperSettings";
import { generateRandomId } from './utils';
import axios from 'axios';

function getPersoan() {
    const { course, subject, school } = useBasicSettings.getState();
    let info = useSummary.getState().info;
    let summary = useSummary.getState().summary;
    let titleResult = useRequest.getState().titleResult;
    let links = useContent.getState().linkGroup;
    let preStudy = [{
        role: 'user',
        content: `你是一个学术优秀的，来自${school}的${course}-${subject}专业教授以及论文写手，现在你将为一个该专业的你的学生做毕业论文的生成指导。
        `,
    }, {
        role: 'assistant',
        content: 'roger'
    },
    {
        role: 'user',
        content: `
        以下是这个论文的选题：“${titleResult}”,请你学习内容后，为后续要求做准备。
        `,
    }, {
        role: 'assistant',
        content: 'roger'
    },
    {
        role: 'user',
        content: `
        以下是这个论文的研究背景：“${info}”,请你学习内容后，为后续要求做准备。
        `,
    }, {
        role: 'assistant',
        content: 'roger'
    },
    {
        role: 'user',
        content: `
        以下是这个论文的摘要：“${summary}”,请你学习内容后，为后续要求做准备。
        `,
    }, {
        role: 'assistant',
        content: 'roger'
    },
    ];
    if (links.length > 0) {
        links.map((link) => {
            preStudy.push({
                role: 'user',
                content: `
                以下是这个论文的引用文献：“${link.title}”,作者是：“${link.author},内容是：“${link.summary}”，请你学习内容后，为后续要求做准备。
                `,
            });
            preStudy.push({
                role: 'assistant',
                content: 'roger'
            });
        }
        );
    }
    return preStudy;
}

function createPrompt() {

    const { prompt, studyContent, step } = useContent.getState();
    let titleResult = useRequest.getState().titleResult;

    const getText = (step) => {
        let text = useContent.getState().content;

        if (step === 1) {
            let wenxian = summaryLink(useContent.getState().linkGroup);
            return `
            以下是一个论文的章节：“${studyContent}”，
            请将文本中所有引用的文献或材料替换为以下内容：“${wenxian}”。
            要求将“${wenxian}”融合进正文中的相应位置，而不是在文末列出。
            在替换或融合文献时，请确保内容的连贯性和逻辑性。
            请直接提供修改后的中文内容，无需提供英文翻译。
            `;
        }
        if (step === 2) {
            return `
            请将上述要求处理好的中文文本翻译成准确的英文,请直接提供翻译后的内容，无需任何额外的介绍或填充语。
            `;
        }
        else if (step === 3) {
            return `
            请根据上述你的英文翻译，在保持语言结构和内容结构以及英文语言并使用英文语义库的同时，将此章节改写成《${titleResult}》这一选题的内容。请在原有基础上进行内容的改写和扩写，请注意逻辑通顺，语句通顺,请直接提供编写后的内容，无需任何额外的介绍或填充语，请保证你得扩写文本长度大于原文本长度。`;
        }
        else if (step === 4) {

            return `
            请把你上一次的英文文章转译成中文，不要按照最开始的中文文本进行直译，请进行文本润色，注意论文降重,
            无需任何额外的介绍或填充语。
            `;
        }
    }
    let text = getText(step);
    // let text = `以下是一个论文的章节：“${studyContent}”,
    //             将此章节改写并扩写成符合你之前学到的内容，以及选题，研究背景的内容，
    //             为了保证论文重复率在20%以下,请直尽量使用你的原创语句进行扩写和发挥，不要直接复制原文内容。
    //             请保持标题内容和格式不变，无需任何额外的介绍或填充语。`;

    if (prompt.length > 0) {
        text = text + `，${prompt}`;
    }

    // if(linkGroup.length>0){
    //     const linkContent = summaryLink(linkGroup);
    //     text = text + `\n请将以下引用 ${linkContent}"，
    //     在上述文本的合适位置进行引用，请注意文献标题的书名号等，保持文本逻辑是通顺的,请直接提供整合后的内容，无需任何额外的介绍或填充语。`;
    // }
    return {
        role: 'user',
        content: text,
    }
}

function summaryLink(links) {
    let text = '';
    links.map((link) => {
        text = text + `作者：${link.author} 文献标题：${link.title}的摘要:"${link.summary}"，`;
    });
    return text;
}

function reRenderPrompt() {

    const { prompt, link } = useContent.getState();
    if (link.length > 0 && link.author) {
        text = text + `请将以下引用 ${linkContent}"，
        在上述文本的合适位置进行引用，请注意文献标题的书名号等，保持文本逻辑是通顺的,请直接提供整合后的内容，无需任何额外的介绍或填充语。`;
    }
    return {
        role: 'user',
        content: prompt,
    }

}

export async function handleGeneralContents() {
    return new Promise(async (resolve, reject) => {

        const { chat, step, prompt } = useContent.getState();

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

            let content = useContent.getState().content;
            const repeat = {
                role: 'assistant',
                content: data
            }

            newPrompt = [...newPrompt, repeat];
            content = data;
            if (step !== 4) {
                newPrompt = [...newPrompt, repeat];
            } else {
                content = data;
                newPrompt = [];
            }

            useContent.setState({
                content: step === 4 ? content : '',
                step: step === 4 ? 1 : step + 1,
                chat: newPrompt, 
                prompt: step === 4 ? '' : prompt,
                linkGroup: step === 4 ? [] : useContent.getState().linkGroup
            });
            // useContent.setState({ content: content ,chat:newPrompt,prompt:''});
            // useContent.setState({ content: content ,prompt:'',linkGroup:[]});
            resolve(data);
        }).catch((error) => {
            console.log('error:', error);
            reject(error);
        });
    });

}
