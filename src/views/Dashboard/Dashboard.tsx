import {useEffect, useState} from "react"
import {Row, Col, Card, Progress} from "antd"
import {connect} from "react-redux"
import {getIps} from "@/api/mointer"
import {Line as LineEchart} from "@/components/echarts";

const mapStateToProps = (state:any /*, ownProps*/) => {
    return {
        userInfo: state.user.userInfo
    };
};
const getOpt = () => ({
    xAxis: {
        type: "category",
        boundaryGap: false,
        show: false,
    },
    yAxis: {
        show: false,
    },
    tooltip: {},
    grid: {
        height: "100%",
        left: "1%",
        right: "1%",
        bottom: "0%",
        top: "0%",
    },
    series: [
        {
            name: "visitor",
            type: "line",
            itemStyle: {
                color: "#975fe4",
            },
            lineStyle: {
                type: "solid",
            },
            data: [],
            smooth: true,
            symbol: "none", //取消折点圆圈
            areaStyle: {
                color: "#975fe4",
            },
        },
    ],
});
const echartStyle = {
    height: 50,
};

function getPercentage(up:number, down:number) {
    if (!down) return 0;
    return Number(((up / down) * 100).toFixed(2));
}

const strokeColor = {
    "0%": "#108ee9",
    "100%": "#87d068",
};

function useVistor() {
    const [visitorOpt, setVisitor] = useState(getOpt());
    const [dealOpt, setDeal] = useState(getOpt());
    const [sumVisitor, setSumV] = useState(0);
    const [sumDeal, setSumD] = useState(0);

    useEffect(() => {
        getIps().then(res => {
            const {data} = res;
            const vOpt:any = {...visitorOpt};
            const dOpt:any = {...dealOpt};
            vOpt.xAxis.data = data.ips.map((i:any) => i.time);
            vOpt.series[0].data = data.ips.map((i:any) => i.value);
            dOpt.xAxis.data = data.deal.map((i:any) => i.time);
            dOpt.series[0].data = data.deal.map((i:any) => i.value);
            setDeal(dOpt);
            setVisitor(vOpt);
            setSumV(data.today.ips);
            setSumD(data.today.deal);
        })
        // eslint-disable-next-line
    }, []);

    return {
        visitorOpt,
        dealOpt,
        sumVisitor,
        sumDeal,
    };
}

function Dashboard() {
    const {
        visitorOpt,
        dealOpt,
        sumVisitor,
        sumDeal,
    } = useVistor();
    return (
        <div style={{padding: "20px 0"}}>
            <Row gutter={[20, 20]}>
                <Col span={6}>
                    <Card className="cards">
                        <p className="title">访问量</p>
                        <p className="num">
                            {visitorOpt.series[0].data.reduce((a, c) => a + c, 0)}
                        </p>
                        <div className="echart">
                            <LineEchart option={visitorOpt} style={echartStyle}/>
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="cards">
                        <p className="title">处理次数</p>
                        <p className="num">
                            {dealOpt.series[0].data.reduce((a, c) => a + c, 0)}
                        </p>
                        <div className="echart">
                            <LineEchart option={dealOpt} style={echartStyle}/>
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="cards">
                        <p className="title">今日访问</p>
                        <p className="num">{sumVisitor}</p>
                        <div>
                            <p>占全部：</p>
                            <Progress
                                strokeColor={strokeColor}
                                percent={getPercentage(
                                    sumVisitor,
                                    visitorOpt.series[0].data.reduce((a, c) => a + c, 0)
                                )}
                            />
                        </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="cards">
                        <p className="title">今日处理</p>
                        <p className="num">{sumDeal}</p>
                        <div>
                            <p>占全部：</p>
                            <Progress
                                strokeColor={strokeColor}
                                percent={getPercentage(
                                    sumDeal,
                                    dealOpt.series[0].data.reduce((a, c) => a + c, 0)
                                )}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default connect(mapStateToProps, null)(Dashboard)
