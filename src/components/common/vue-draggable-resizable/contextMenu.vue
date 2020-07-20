<template>
<div class="drag-context_menu">
    <ul>
        <li class="context-menu_item" v-for="(item, index) in contextMenu" :key="index + 'contextMenu'" @click="eventHandle(item.eventType)">
            {{ item.label }}
        </li>
    </ul>
</div>
</template>
<script>
export default {
    props: {
        eventHandle: {
            type: Function
        },
        menuShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            contextMenu: [
                {
                    label: '删除',
                    icon: 'delete',
                    eventType: 'del'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scope="scoped">
    .drag-context_menu 
    {
        width: 100px;
        .context-menu_item 
        {
            padding: 6px;
        }
    }
</style>