
import styled from "@emotion/styled";
import React, {FC, LegacyRef, RefObject, useMemo, useRef} from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";
import {Dictionary} from "../hooks/useDirectory";
import useScrollPosition from "../hooks/useScrollPosition";

//// ████████████
export const CONTAINER_HEIGHT = 400
export const ITEM_HEIGHT = 30
export const ITEMS_ON_1_PAGE = CONTAINER_HEIGHT / ITEM_HEIGHT
export const GAP = 15
const bufferedItems = 2;

console.log("=== ITEMS_ON_1_PAGE ",ITEMS_ON_1_PAGE)

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  width: 100%;
  height:500px;
  overflow: auto;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export interface ListProps {
    //// ████████████
    items: Dictionary;
}

export const List: FC<ListProps> = ({ items }) => {

    //// ████████████
    const refList:RefObject<HTMLElement>=useRef<HTMLElement>(null)

    //// ████████████
    const position:any = useScrollPosition(
        refList
    )

    console.log("=== onScroll position",position)

    //=== DOC https://stackoverflow.com/questions/62366759/virtualized-list-with-reactjs

    //// ████████████
    const visibleChildren = useMemo(() => {

        const startIndex = Math.max(
            Math.floor(position / ITEM_HEIGHT) - bufferedItems,
            0
        );

        const endIndex =
            Math.min(
                items.length-1,
                Math.ceil((position + CONTAINER_HEIGHT) / ITEM_HEIGHT - 1 ) + bufferedItems
            )

        console.log("=== startIndex endIndex",startIndex, endIndex)

        const retDaga =  items.slice(startIndex, endIndex + 1).map((word, index) => {
            return <Item key={word}
                      item_style={{
                          top: (startIndex + index) * ITEM_HEIGHT + index * GAP,
                          height: ITEM_HEIGHT,
                          left: 0,
                          right: 0,
                          lineHeight: `${ITEM_HEIGHT}px`
                      }}
                >
                    {word}
                    {items.indexOf(word)}
                </Item>

        })
        console.log("=== visibleChildren",retDaga)
        return  retDaga

    },[
        items,
        position
    ])

    return (
        <ScrollWrapper
            style={{
                position:'fixed', //// ████████████
                height: CONTAINER_HEIGHT+'px',
            }}
            //// ████████████
            ref={refList as LegacyRef<HTMLDivElement> }
        >
            <ListWrapper>

                <SafelyRenderChildren>

                    {/* //// ████████████ */}
                    {visibleChildren}

                    {/*{items.slice(0, 5000).map((word) => {*/}
                    {/*        return <Item key={word}>{word}</Item>*/}
                    {/*})}*/}

                </SafelyRenderChildren>
            </ListWrapper>
        </ScrollWrapper>
    );
};
