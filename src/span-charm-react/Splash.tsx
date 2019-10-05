import React, { useState } from "react";
export function Splash(props: any) {
    return (
        <div style={{ height: 100 + '%', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 100 + '%', textAlign: 'center' }}>
                <div>{props.data.title}</div>
                <div>Connecting...</div>
                <div>TEST TEXT</div>
            </div>
        </div>
    )
}