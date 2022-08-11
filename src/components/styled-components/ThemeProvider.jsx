import { createContext } from "react";


export const BaseTheme = {
    colors: {
        primary: '#30A5BF',
        info: '#31eeb9',
        success: '#4dff00',
        secondary: '#185359',
        warning: '#EBD433',
        danger: '#d41818',
        black: '#000',
        white: '#fff',
        light: '#70706e',
        gray: '#313131',
    },
    borders: {
        border: `1px solid #000`,
        borderRadius: 5
    }
}

export const Theme = createContext({ ...BaseTheme });

export const handleThemeColors = (props) => {
    if (props.Theme && props.Theme.colors) return props.Theme.colors[props.color]
    return BaseTheme.colors[props.color || 'primary'];
}