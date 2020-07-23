// 状态
// 右键菜单

import {
    mapState,
    mapActions
} from 'vuex'
export default {
    // elements为渲染组件，handleClickElementProp为点击组件时候的函数，handleClickCanvasProp，为点击画布的函数
    props: ['elements', 'handleClickElementProp', 'handleClickCanvasProp  '],
    data() {
        return {
            vLines: [], // 纵向辅助线
            hLines: [], // 横向向辅助线
            contextmenuPos: [] // 上下文菜单位置
        }
    },
    methods: {
        // 生成横向辅助线
        drawVLine(newLeft) {
            this.vLines = [{
                left: newLeft
            }]
        },
        clearVLine() {
            this.vLines = []
        },
        // 生成纵向辅助线
        drawHLine(newTop) {
            this.hLines = [{
                top: newTop
            }]
        },
        clearHLine() {
            this.hLines = []
        },
        // 计算横向辅助线
        calcVHLine(isPointMove) {
            const {
                uuid
            } = this.editingElement.uuid // 编辑中的元素
            const referElements = this.elements.filter(e => e.uuid !== uuid) // 非编辑态的组件，elements包含瓦片
            let referElementsXCoords = [] // 记  录所有非编辑态元素的左上, 中心, 右下坐标, 用于后面的元素对其
            let referElementsYCoords = []
            referElements.forEach(e => {
                const {
                    width,
                    left,
                    height,
                    top
                } = e.commonStyle

                referElementsXCoords = [...referElementsXCoords, left, left + (width / 2), left + width]
                referElementsYCoords = [...referElementsYCoords, top, top + (height / 2), top + height]
            });
            // 编辑中的元素
            const {
                left: eleft,
                top: etop,
                width: ewidth,
                height: eheight
            } = this.editingElement.commonStyle
            const exCoords = [eleft + ewidth, eleft + (ewidth / 2), eleft] // 右中左
            const eyCoords = [etop + eheight, etop + (eheight / 2), etop] // 下中上
            let hasVLine = false
            let hasHLine = false
            exCoords.forEach(eX => {
                referElementsXCoords.forEach(referX => {
                    let offset = referX - eX
                    if (Math.abs(offset) <= 5) { // 吸附效果
                        if (isPointMove) { // 如果是通过四周的点拖拽那就是宽度吸附
                            this.setElementPosition({
                                width: ewidth + offset
                            })
                        } else { // 否则就是横向吸附
                            this.setElementPosition({
                                left: eleft + offset
                            })
                        }
                        this.drawVLine(referX)
                        hasVLine = true
                    }
                })
            })
            eyCoords.forEach(eY => {
                referElementsYCoords.forEach(referY => {
                    let offset = referY - eY
                    if (Math.abs(offset) <= 5) {
                        if (isPointMove) {
                            this.setElementPosition({
                                height: eheight + offset
                            })
                        } else {
                            this.setElementPosition({
                                top: etop + offset
                            })
                        }
                        this.drawHLine(referY)
                        hasHLine = true
                    }
                })
            })
            if (!hasVLine) {
                this.clearVLine()
            }
            if (!hasHLine) {
                this.clearHLine()
            }
        },
        // 在元素非点过程中，计算和生成辅助线
        handleElementMove(pos) {
            this.setElementPosition(pos)
            this.calcVHLine(false)
        },
        // 元素通过点拖动过程中，计算和生成辅助线
        handlePointMove(pos) {
            this.setElementPosition(pos)
            this.calcVHLine(true)
        },
        bindContextMenu(e) {
            const {
                x,
                y
            } = this.$el.getBoundingClientRect() // 画布
            this.contextmenuPos = [e.clientX - x, e.clientY - y] // 右键菜单位置
        },
        hideContextMenu() {
            this.contextmenuPos = []
        },
        handleClickCanvas(e) {
            if (!e.target.classList.contains('element-on-edit-canvas')) {
                this.setEditingElement()
            }
        },
        // 更新高度
        updateWorkHeight(height) {
            this.updateWork({
                height
            })
        },
        // 放大画布适配操作
        mousedownForAdjustLine(e) {
            let startY = e.clientY
            let startHeight = this.work.height
            const canvasOuterWrapper = document.querySelector('#canvas-outer-wrapper')
            let move = moveEvent => {
                // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
                moveEvent.stopPropagation()
                moveEvent.preventDefault()
                let currY = moveEvent.clientY
                let currentHeight = currY - startY + startHeight
                this.updateWorkHeight(currentHeight)
                // 交互效果：滚动条同步滚动至底部
                canvasOuterWrapper && (canvasOuterWrapper.scrollTop = canvasOuterWrapper.scrollHeight)
            }

            let up = moveEvent => {
                document.removeEventListener('mousemove', move, true)
                document.removeEventListener('mouseup', up, true)
            }
            document.addEventListener('mousemove', move, true)
            document.addEventListener('mouseup', up, true)
        },
        // renderCanvas 渲染中间画布
        renderCanvas(h, elements) {
            return ( <div style = {
                    {
                        height: '100%',
                        position: 'relative'
                    }
                }
                onClick = {
                    (e) => {
                        this.hideContextMenu()
                        this.handleClickCanvas(e)
                    }
                }
                onContextmenu = {
                    e => {
                        e.preventDefault()
                        e.stopPropagation()
                    }
                } >
                {
                    elements.map((element, index) => {
                        if (element.name === 'lbp-background') {
                            return h('lbp-background', {
                                props: element.getProps()
                            })
                        }
                        const data = {
                            style: {
                                width: '100%',
                                height: '100%'
                            },
                            // 添加 class 的原因：与 handleClickCanvasProp 配合,
                            // 当点击编辑画布上的其它区域（clickEvent.target.classList 不包含下面的 className）的时候，设置 editingElement=null
                            class: 'element-on-edit-canvas',
                            props: {
                                ...element.getProps(),
                                editorMode: 'edit'
                            },
                            on: {
                                input: ({
                                    value,
                                    pluginName
                                }) => {
                                    if (pluginName === 'lbp-text') {
                                        element.pluginProps.text = value
                                    }
                                }
                            }
                        }
                        return (
                            <Shape
                             style={element.getStyle({ position: 'absolute' })}
                             defaultPosition={element.commonStyle} // {top, left}
                             element={element}
                             active={this.editingElement === element}
                             handleMousedownProp={() => {
                                 // 在shape上面添加mousedown，而非 plugin 本身添加 onClick 的原因：
                                 // 在 mousedown 的时候，即可激活 editingElement(当前选中元素)
                                 // 这样，就不用等到鼠标抬起的时候，也就是 plugin 的 onClick 生效的时候，才给选中的元素添加边框等选中效果
                                 this.setEditingElement(element)
                             }}
                             // shape四周point移动事件
                             handlePointMoveProp={this.handlePointMove}
                             handleElementMoveProp={this.handleElementMove}
                             handleElementMouseUpProp={() => {
                                this.clearHLine()
                                this.clearVLine()
                                this.recordElementRect()
                              }}
                              handlePointMouseUpProp={() => {
                                this.clearHLine()
                                this.clearVLine()
                                this.recordElementRect()
                              }}
                              nativeOnContextmenu={e => {
                                this.bindContextMenu(e)
                              }}
                            >
                                {h(element.name, data)}
                            </Shape>
                        )
                    })
                }
                {/* 辅助线 */}
                {
            this.vLines.map(line => (
              <div class="v-line" style={{ left: `${line.left}px` }}></div>
            ))
          }
          {
            this.hLines.map(line => (
              <div class="h-line" style={{ top: `${line.top}px` }}></div>
            ))
          }
          {/* 右键菜单 */}
          {
             this.contextmenuPos.length ?
             <ContextMenu  
             position={this.contextmenuPos}
             onSelect={({ item, key, selectedKeys }) => {
                 this.elementManager({ type: key })
                 this.hideContextMenu()
             }}
             onHideMenu={this.hideContextMenu}
             /> : null
          }
           <div style={{
            position: 'absolute',
            top: `${this.work.height}px`,
            width: '100%'
          }}>
            <div class="adjust-line-wrapper adjust-line-wrapper-h">
              <div class="adjust-line adjust-line-h"></div>
              <div class="adjust-button" onMousedown={this.mousedownForAdjustLine}><div class="indicator"></div></div>
              <div class="adjust-tip">
                <span>320 x</span>
                {/* <a-input-number
                  size="small"
                  style="margin: 0 4px; width:60px;"
                  value={this.work.height}
                  onChange={height => { this.updateWork({ height }) }}
                /> */}
                <span>px</span>
              </div>
            </div>
          </div>

                </div>
            )
        }
    },
    render (h) {
        return this.renderCanvas(h, this.elements)
    }
}