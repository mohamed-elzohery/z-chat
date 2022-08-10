const truncateText: (text: string, max: number) => string = (text, max) => {
    if(text.length < max) return text;
    return text.substring(0, max) + '...';
}

export default truncateText;