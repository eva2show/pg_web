<script>
    import { onMount, onDestroy } from "svelte";

    onMount(() => {});
</script>

<div
    id="__custom_alert"
    class="custom_alert custom_alert_show"
    style="display: block; width: 360px; height: 640px;"
>
    <div class="backdrop"></div>
    <div class="content" style="left: 58.5px; top: 252px;">
        <div class="title title_padding"><b>未能成功启动</b></div>
        <div class="message message_padding">
            服务器请求失败。<br /><span class="errorlabel"
                >(错误代码：S1034VBGTWQ23)<span></span></span
            >
        </div>
        <div class="line_separator"></div>
        <div class="btn_content btn_content_row">
            <div id="ca-button-0" class="button">重新加载</div>
            <div class="btn_separator_width row"></div>
            <div id="ca-button-1" class="button">退出</div>
        </div>
    </div>
</div>

<style>
</style>
