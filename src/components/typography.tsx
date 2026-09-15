// src/components/Typography.tsx

import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const fontMap = {
    light: 'kumbh-sans(3)',
    regular: 'kumbh-sans(4)',
    medium: 'kumbh-sans(5)',
    semibold: 'kumbh-sans(6)',
    bold: 'kumbh-sans(7)',
};

type Weight = keyof typeof fontMap;

interface AppTextProps extends TextProps {
    weight?: Weight;
}

function BaseText({
    style,
    weight = 'regular',
    ...props
}: AppTextProps) {
    return (
        <Text
            style={[
                { fontFamily: fontMap[weight] },
                style,
            ]}
            {...props}
        />
    );
}


/* ==================== H1 ==================== */

export function H1L(props: AppTextProps) {
    return <BaseText weight="light" {...props} style={[styles.h1, props.style]} />;
}

export function H1(props: AppTextProps) {
    return <BaseText weight="regular" {...props} style={[styles.h1, props.style]} />;
}

export function H1M(props: AppTextProps) {
    return <BaseText weight="medium" {...props} style={[styles.h1, props.style]} />;
}

export function H1SB(props: AppTextProps) {
    return <BaseText weight="semibold" {...props} style={[styles.h1, props.style]} />;
}

export function H1B(props: AppTextProps) {
    return <BaseText weight="bold" {...props} style={[styles.h1, props.style]} />;
}


/* ==================== H2 ==================== */

export function H2L(props: AppTextProps) {
    return <BaseText weight="light" {...props} style={[styles.h2, props.style]} />;
}

export function H2(props: AppTextProps) {
    return <BaseText weight="regular" {...props} style={[styles.h2, props.style]} />;
}

export function H2M(props: AppTextProps) {
    return <BaseText weight="medium" {...props} style={[styles.h2, props.style]} />;
}

export function H2SB(props: AppTextProps) {
    return <BaseText weight="semibold" {...props} style={[styles.h2, props.style]} />;
}

export function H2B(props: AppTextProps) {
    return <BaseText weight="bold" {...props} style={[styles.h2, props.style]} />;
}


/* ==================== H3 ==================== */

export function H3L(props: AppTextProps) {
    return <BaseText weight="light" {...props} style={[styles.h3, props.style]} />;
}

export function H3(props: AppTextProps) {
    return <BaseText weight="regular" {...props} style={[styles.h3, props.style]} />;
}

export function H3M(props: AppTextProps) {
    return <BaseText weight="medium" {...props} style={[styles.h3, props.style]} />;
}

export function H3SB(props: AppTextProps) {
    return <BaseText weight="semibold" {...props} style={[styles.h3, props.style]} />;
}

export function H3B(props: AppTextProps) {
    return <BaseText weight="bold" {...props} style={[styles.h3, props.style]} />;
}


/* ==================== P ==================== */

export function PL(props: AppTextProps) {
    return <BaseText weight="light" {...props} style={[styles.p, props.style]} />;
}

export function P(props: AppTextProps) {
    return <BaseText weight="regular" {...props} style={[styles.p, props.style]} />;
}

export function PM(props: AppTextProps) {
    return <BaseText weight="medium" {...props} style={[styles.p, props.style]} />;
}

export function PSB(props: AppTextProps) {
    return <BaseText weight="semibold" {...props} style={[styles.p, props.style]} />;
}

export function PB(props: AppTextProps) {
    return <BaseText weight="bold" {...props} style={[styles.p, props.style]} />;
}


/* ==================== Cap ==================== */

export function CapL(props: AppTextProps) {
    return <BaseText weight="light" {...props} style={[styles.cap, props.style]} />;
}

export function Cap(props: AppTextProps) {
    return <BaseText weight="regular" {...props} style={[styles.cap, props.style]} />;
}

export function CapM(props: AppTextProps) {
    return <BaseText weight="medium" {...props} style={[styles.cap, props.style]} />;
}

export function CapSB(props: AppTextProps) {
    return <BaseText weight="semibold" {...props} style={[styles.cap, props.style]} />;
}

export function CapB(props: AppTextProps) {
    return <BaseText weight="bold" {...props} style={[styles.cap, props.style]} />;
}


/* ==================== Styles ==================== */

const styles = StyleSheet.create({
    h1: {
        fontSize: 48,
        lineHeight: 68,
        color: '#1a1a1a',
    },

    h2: {
        fontSize: 36,
        lineHeight: 56,
        color: '#1a1a1a',
    },

    h3: {
        fontSize: 24,
        lineHeight: 42,
        color: '#1a1a1a',
    },

    p: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333333',
    },

    cap: {
        fontSize: 14,
        lineHeight: 16,
        color: '#666666',
    },
});