//context 用法
import {createContext, useContext, useState, useEffect, useCallback} from "react"
const CountContext = createContext(0)


let count = 0;
function TTT() {
    const [val, setVal] = useState("");
    const getData = useCallback(() => {
        setTimeout(() => {
            setVal("new data " + count);
            count++;
        }, 500);
    }, []);


    return <Child val={val} getData={getData} />;
}

function Child({val, getData}:any) {
    useEffect(() => {
        getData();
    }, [getData]);

    return <div>{val}</div>;
}


function TestComponent(){
    const [count,setCount] = useState<number>(0)
    return (
        <div style={{width:"500px",height:"500px",background:"white"}}>
            <h1>{count}</h1>
            <button onClick={()=>{setCount(count + 1)}}>add </button>
            <CountContext.Provider value={count}>
                <CChi></CChi>
                <CountContext.Consumer>
                    {
                        count=>(<CChi2 count={count}></CChi2>)
                    }
                </CountContext.Consumer>
            </CountContext.Provider>
            <TTT/>
        </div>
    );
}

function CChi(){
    const countContext = useContext(CountContext)
    return (
        <div>{countContext}</div>
    )
}

function CChi2({count}:any){
    return (
        <div>{count}</div>
    )
}

export default TestComponent
