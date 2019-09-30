import React, { useState } from 'react';
import { Loader, Modal } from 'semantic-ui-react'
export function Splash(props: any) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);
    return (
        <Modal basic open={true} size={'mini'}>
            <Modal.Content>
                <Loader active inline='centered'>
                    <h1>Era.js</h1>
                    <p>Loading...</p>
                    <p>Loading...</p>
                </Loader>
            </Modal.Content>
        </Modal >
    )
}