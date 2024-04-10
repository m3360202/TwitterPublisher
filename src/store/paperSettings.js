import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFontSettings = create((set) => ({
    mainTitle:{
        fontSize:'24px',
        fontWeight:'blod',
        fontFamily:''
    },
    subTitle:{
        fontSize:'20px',
        fontWeight:'600',
        fontFamily:''
    },
    title:{
        fontSize:'18px',
        fontWeight:'blod',
        fontFamily:''
    },
    summary:{
        fontSize:'16px',
        fontWeight:'500',
        fontFamily:''
    },
    summaryTranslate:{
        fontSize:'16px',
        fontWeight:'500',
        fontFamily:''
    },
    content:{
        fontSize:'14px',
        fontWeight:'500',
        fontFamily:''
    }
}));

export const useBasicSettings = create(
    persist((set) => ({
    student:'',
    teacher:'',
    school:'',
    course:'',
    subject:'',
}),
{ name: 'basicSettings' })
);


export const useRequest = create(
    persist((set) => ({
    title:'',
    request:'',
    userRequest:'',
    titleResult:'',
    chat:[]
}),
{ name: 'request' }));

export const useKt = create(
    persist((set) => ({
    content:'',
    prompt:'',
    links:'',
    link:"",
    linkGroup:[],
    num:3000,
    process:1,
    step:1,
    chat:[]
}),
{ name: 'kt' }
));

export const useSummary = create(
    persist((set) => ({
    industry:'',
    info:'',
    summary:'',
    summaryEn:'',
    prompt:'',
    chat:[],
}),
{ name: 'summary' }));

export const useDirectory = create(
    persist((set) => ({
    directory:'',
    num:8,
    prompt:'',
    chat:[]
}),
{ name: 'directory' }));

export const useContent = create(
    persist((set) => ({
    content:'',
    studyContent:'',
    links:'',
    link:"",
    linkGroup:[],
    prompt:'',
    process:1,
    step:1,
    chat:[]
}),
{ name: 'content' }));

export const useThank = create(
    persist((set) => ({
    content:'',
    prompt:'',
    chat:[]
}),
{ name: 'thank' }));

export const useLinks = create(
    persist((set) => ({
    keyword:'',
    year:2,
    type:1,//1论文2期刊
    page:1,
    links:[],
}),
{ name: 'links' }));

export function reSetAll (){
    useFontSettings.setState({
        mainTitle:{
            fontSize:'24px',
            fontWeight:'blod',
            fontFamily:''
        },
        subTitle:{
            fontSize:'20px',
            fontWeight:'600',
            fontFamily:''
        },
        title:{
            fontSize:'18px',
            fontWeight:'blod',
            fontFamily:''
        },
        summary:{
            fontSize:'16px',
            fontWeight:'500',
            fontFamily:''
        },
        summaryTranslate:{
            fontSize:'16px',
            fontWeight:'500',
            fontFamily:''
        },
        content:{
            fontSize:'14px',
            fontWeight:'500',
            fontFamily:''
        }
    });
    useBasicSettings.setState({
        student:'',
        teacher:'',
        school:'',
        course:'',
        subject:'',
    });
    useRequest.setState({
        title:'',
        request:'',
        userRequest:'',
        titleResult:'',
        chat:[]
    });
    useKt.setState({
        content:'',
        prompt:'',
        links:'',
        link:"",
        linkGroup:[],
        num:3000,
        process:1,
        step:1,
        chat:[]
    });
    useSummary.setState({
        industry:'',
        info:'',
        summary:'',
        summaryEn:'',
        prompt:'',
        chat:[],
    });
    useDirectory.setState({
        directory:'',
        num:8,
        prompt:'',
        chat:[]
    });
    useContent.setState({
        content:'',
        studyContent:'',
        links:'',
        link:"",
        linkGroup:[],
        prompt:'',
        process:1,
        step:1,
        chat:[]
    });
    useThank.setState({
        content:'',
        prompt:'',
        chat:[]
    });
    useLinks.setState({
        keyword:'',
        year:2,
        type:1,//1论文2期刊
        page:1,
        links:[],
    });
}
export function reSetContentChat(){
        useContent.setState({
            chat:[]
        });
}