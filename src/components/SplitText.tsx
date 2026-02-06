import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface SplitTextProps extends HTMLMotionProps<'div'> {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
    text,
    className = '',
    delay = 0,
    duration = 0.05,
    ...props
}) => {
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: duration, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 50,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    } as any;

    return (
        <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
            {...props}
        >
            {words.map((word, i) => (
                <motion.div
                    key={i}
                    style={{ display: 'flex', whiteSpace: 'nowrap', marginRight: '0.25em' }}
                >
                    {word.split('').map((char, index) => (
                        <motion.span variants={child} key={index}>
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default SplitText;
