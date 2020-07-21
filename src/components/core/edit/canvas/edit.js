// 状态
// 右键菜单

import { mapState, mapActions } from 'vuex'
export default {
    // elements为渲染组件，handleClickElementProp为点击组件时候的函数，handleClickCanvasProp，为点击画布的函数
    props: ['elements', 'handleClickElementProp', 'handleClickCanvasProp  '],
    data() {
        return {
            vLines: [], // 横向辅助线
            hLines: [], // 纵向辅助线
            contextmenuPos: [] // 上下文菜单位置
        }
    },
    methods: {
        // 生成横向辅助线
        drawVLine (newLeft) {
            this.vLines = [{ left: newLeft }]
        },
        clearVLine () {
            this.vLines = []
        },
        // 生成纵向辅助线
        drawHLine (newTop) {
            this.hLines =  [{ top: newTop }]
        },
        clearHLine () {
            this.hLines = []
        },
        // 计算横向辅助线
        calcVHLine (isPointMove) {
            const { uuid } = this.editingElement.uuid // 编辑中的元素
            const referElements = this.elements.filter(e => e.uuid !== uuid) // 非编辑态的组件
            let referElementsXCoords = []  // 记录所有非编辑态元素的左上, 中心, 右下坐标, 用于后面的元素对其
            let referElementsYCoords = []
            referElements.forEach(e => {
                const { width, left, height, top } = e.commonStyle
                
                referElementsXCoords = [ ...referElementsXCoords, left, left + ( width / 2 ), left + width ]
                referElementsYCoords = [ ...referElementsYCoords, top, top + ( height / 2 ), top + height ]
            });


        }
    },
}