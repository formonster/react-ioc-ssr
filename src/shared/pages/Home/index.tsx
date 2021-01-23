import React, { useEffect } from 'react';
import { css } from '@emotion/css'
import { BaseService } from '../../service';
import { AxiosResponse } from 'axios';
import { RouteConfig } from 'react-router-config'
import { setState, useWatchState } from '../../store';

if (global.window) window.addEventListener("message", function (e) {
    console.log(e.origin);
    console.log(e.data);
})

Home.loadData = (statePath: string) => {
    return new Promise((resolve, reject) => {
        BaseService.homeData().then((res: AxiosResponse) => {
            setState(statePath, res.data);
            resolve(res.data)
        })
    })
}

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

    const color = 'white'

    return (
        <div className={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${color};
        }
      `}>
            <video width="300px" className={css`
            transform: rotate(45deg);`} autoPlay controls src="/media/video/forest.mp4"></video>
            <h1 className={css`
        padding: 32px;
      `}>2Home{data.count}</h1>
            <button onClick={setData.bind(null, { count: data.count + 1 })}>+1</button>
        </div>
    );
}

export default Home;