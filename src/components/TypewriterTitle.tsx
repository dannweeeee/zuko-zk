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
                typewriter.typeString("✅ Privacy-First Careers")
                .pauseFor(250).deleteAll()
                .typeString("✅ Hire Without Fear")
                .pauseFor(250).deleteAll()
                .start();
            }}
        />
    )
    }

export default TypewriterTitle