import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";
import {ResultStatusType} from "antd/lib/result";

const mapStateToProps = (state:any) => ({
	openMenus:state.menus.openMenus
});

interface IProps {
	history:any;
	status:ResultStatusType | undefined;
	errTitle:string;
	subTitle:string;
}

function useErrorPage(props:IProps) {
	const {
		history,
		status = "404",
		errTitle = "404",
		subTitle = "Sorry, the page you visited does not exist.",
	} = props;
	const back = ()=>{
		history.goBack()
	};
	return { status, errTitle, subTitle, back };
}

function ErrorPage(props:IProps) {
	const { status, errTitle, subTitle, back} = useErrorPage(props);
	return (
		<Result
			status={status}
			title={errTitle}
			subTitle={subTitle}
			extra={
				<Button type="primary" onClick={ back }>
					Go Back
				</Button>
			}
		/>
	);
}

export default connect(mapStateToProps, null)(ErrorPage);
