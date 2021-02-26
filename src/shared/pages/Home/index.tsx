import React, { useEffect } from 'react';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { BaseService } from '@/service';
import { Main } from '@/modules';
import { AxiosResponse } from 'axios';
import { Button } from '@material-ui/core';
import { RouteConfig } from 'react-router-config'
import { setState, useWatchState } from '@/store';
import { isWindow } from '@/check';

Home.loadData = (statePath: string) => {
    return new Promise((resolve, reject) => {
        BaseService.homeData().then((res: AxiosResponse) => {
            setState(statePath, res.data);
            resolve(res.data)
        })
    })
}

// 错误监控
// if (isWindow()) {
//     navigator.sendBeacon("http://localhost:4400/api/beacon", '{"data":"xxxx"}');
// }

function Home({ route }: { route: RouteConfig }) {

    const [[data = {}, setData]] = useWatchState([route.statePath]);

    useEffect(() => {
        if (JSON.stringify(data) === "{}") {
            Home.loadData(route.statePath);
        }
    }, [])

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <Main>
            <Button variant="contained" color="primary"><AcUnitIcon /> 你好 世界 prod</Button>
            <p>你好</p>
        </Main>
    );
}

export default Home;