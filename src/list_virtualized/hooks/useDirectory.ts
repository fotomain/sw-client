import { useEffect, useState } from "react"

export type Dictionary = string[];

const fetchDictionary = async (): Promise<Dictionary> => {
    const data = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt")
    const text = await data.text()
    const retArray = text.split("\n")
    console.log('=== retArray',retArray.length)
    return retArray
}

export const useDictionary = () => {
    const [dictionary, setDictionary] = useState<Dictionary>([]);
    useEffect(() => {
        fetchDictionary().then(setDictionary);
    }, []);

    return dictionary;
}
