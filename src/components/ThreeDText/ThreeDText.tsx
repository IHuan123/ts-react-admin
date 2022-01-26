import React, {FC} from "react";
import "./index.scss"




const ThreeDText:FC<any> = ()=>{

    return (
        <div className={"three-d-container"}>
            <div className={'three-d-square'}>
                <div className={"square square-0"}>
                    <span className={"square-text square-text-0"}>1</span>
                    <span className={"square-text square-text-1"}>2</span>
                    <span className={"square-text square-text-2"}>3</span>
                    <span className={"square-text square-text-3"}>4</span>
                </div>
                <div className={"square square-1"}>
                    <span className={"square-text square-text-0"}>1</span>
                    <span className={"square-text square-text-1"}>2</span>
                    <span className={"square-text square-text-2"}>3</span>
                    <span className={"square-text square-text-3"}>4</span>
                </div>
                <div className={"square square-2"}>
                    <span className={"square-text square-text-0"}>1</span>
                    <span className={"square-text square-text-1"}>2</span>
                    <span className={"square-text square-text-2"}>3</span>
                    <span className={"square-text square-text-3"}>4</span>
                </div>
                <div className={"square square-3"}>
                    <span className={"square-text square-text-0"}>1</span>
                    <span className={"square-text square-text-1"}>2</span>
                    <span className={"square-text square-text-2"}>3</span>
                    <span className={"square-text square-text-3"}>4</span>
                </div>
            </div>
        </div>

    )
}

export default ThreeDText
