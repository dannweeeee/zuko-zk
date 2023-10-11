import React from 'react'
import Typewriter from 'typewriter-effect'

type Props = {}

const TypewriterTitle = (props: Props) => {
    return (
        <Typewriter 
            options={{
                loop: true, // loop indefinitely
            }}
            onInit={(typewriter) => {
                typewriter.typeString("✅ Privacy-First Community")
                .pauseFor(250).deleteAll()
                .typeString("✅ ZK Hub for Knowledge and Innovation")
                .pauseFor(250).deleteAll()
                .start();
            }}
        />
    )
    }

export default TypewriterTitle