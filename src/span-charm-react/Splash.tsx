import React, { useState } from "react";
export function Splash(props: any) {
    return (
        <div style={{ height: 100 + '%', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 100 + '%', textAlign: 'center' }}>
                <div>{props.data.title}</div>
                <div>Connecting...</div>
                <div>按[Esc]键打开菜单</div>
                <div>按[`]键打开控制台</div>
            </div>
        </div>
    )
}