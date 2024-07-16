<script>
    import { onMount, onDestroy } from "svelte";
    import { gsap } from "glsdk";

    //  '不  凡   成   就   非   凡';
    // 多语言支持
    export let title = "";
    let logo_p, logo_g;
    let logo_blur_p, logo_blur_g;
    let inload, pre;
    let blur_p_value = {
        stdDeviation: 0,
    };
    let blur_g_value = {
        stdDeviation: 0,
    };

    //离开时需要清理动画，避免内存泄漏。
    let animations = [];

    onMount(() => {
        return;
        animations.push(
            gsap.to(pre, {
                opacity:1,
                duration: 1.2,
                delay: 0.2,
                ease: "power1.inOut"
            })
        );

        animations.push(
            gsap.to(logo_g, {
                keyframes: [
                    { y: 1666, duration: 0.8, startAt: { y: 20 } },
                    {
                        y: 172,
                        duration: 0.4,
                        startAt: { y: 20 },
                        ease: "back.out(1.7)",
                    },
                ],
                repeatDelay: 0.4,
                repeat: -1,
            })
        );

        animations.push(
            gsap.to(logo_p, {
                keyframes: [
                    { y: 1666, duration: 0.8, startAt: { y: 20 } },
                    {
                        y: 172,
                        duration: 0.4,
                        startAt: { y: 20 },
                        ease: "back.out(1.7)",
                    },
                ],
                delay: 0.2,
                repeatDelay: 0.4,
                repeat: -1,
            }),
        );

        animations.push(
            gsap.to(blur_p_value, {
                keyframes: [
                    {
                        stdDeviation: 10,
                        duration: 0.35,
                        startAt: { stdDeviation: 0 },
                        ease: "power4.in",
                    },
                    {
                        stdDeviation: 0,
                        duration: 0.6,
                        startAt: { stdDeviation: 35 },
                        ease: "power4.out",
                    },
                ],
                onUpdate() {
                    if (logo_blur_p) {
                        logo_blur_p.setAttribute(
                            "stdDeviation",
                            "0 " + blur_p_value.stdDeviation,
                        );
                    }
                },
                delay: 0.2,
                repeatDelay: 0.4 + 0.25,
                repeat: -1,
            }),
        );

        animations.push(
            gsap.to(blur_g_value, {
                keyframes: [
                    {
                        stdDeviation: 10,
                        duration: 0.35,
                        startAt: { stdDeviation: 0 },
                        ease: "power4.in",
                    },
                    {
                        stdDeviation: 0,
                        duration: 0.6,
                        startAt: { stdDeviation: 35 },
                        ease: "power4.out",
                    },
                ],
                onUpdate() {
                    if (logo_blur_g) {
                        logo_blur_g.setAttribute(
                            "stdDeviation",
                            "0 " + blur_g_value.stdDeviation,
                        );
                    }
                },
                repeatDelay: 0.4 + 0.25,
                repeat: -1,
            }),
        );

        let s = window.innerHeight / 1024;
        inload.style.transform = `scale(${s})`;
    });
    onDestroy(() => {
        console.log("inloading component is being destroyed");
        blur_p_value = blur_g_value = null;
        animations.forEach((a) => {
            a.kill();
        });
    });
</script>

<div class="initial-loader">
    <div class="svg-loading" bind:this={inload}>
        <svg viewBox="0 0 249 152" style="overflow: hidden; height: 152px;"
            ><svg mask="url(#mask-1716218048434)"
                ><g
                    id="digit-0-1716218048434"
                    bind:this={logo_p}
                    transform="translate(0, 20)"
                    style="filter: url(&quot;#motionFilter-0-1716218048434&quot;);"
                    ><g style="transform: translate(0px, 0px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -152px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -304px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -456px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -608px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -760px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -912px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -1064px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -1216px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -1368px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -1520px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="112"
                            height="112"
                            ><path
                                d="M90.6 9.8h9.8V0h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff6e00;fill-opacity:1"
                            ></path><path
                                d="M0 21.1h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#6414e6;fill-opacity:1"
                            ></path><path
                                d="M11.3 111.6h9.8v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#19bee6;fill-opacity:1"
                            ></path><path
                                d="M68 89h9.7v-9.8H68Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e619dc;fill-opacity:1"
                            ></path><path
                                d="M79.2 9.8H89V0h-9.8ZM68 9.8h9.8V0H68Zm-11.3 0h9.8V0h-9.8Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm-11.4 0h9.8V0h-9.8Zm-11.3 0h9.8V0h-9.8Zm79.3 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM102 32.4h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 32.4h9.8v-9.8H0Zm101.9 11.3h9.8V34h-9.8Zm-11.3 0h9.8V34h-9.8Zm-79.3 0h9.8V34h-9.8ZM0 43.7h9.8V34H0Zm101.9 11.4h9.8v-9.9h-9.8Zm-11.3 0h9.8v-9.9h-9.8Zm-79.3 0h9.8v-9.9h-9.8ZM0 55h9.8v-9.8H0Zm101.9 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-67.9 0h9.8v-9.8h-9.8ZM0 66.4h9.8v-9.8H0Zm90.6 11.3h9.8v-9.8h-9.8Zm-11.4 0H89v-9.8h-9.8Zm-11.3 0h9.8v-9.8H68Zm-11.3 0h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8Zm-11.3 0h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 77.7h9.8v-9.8H0ZM56.6 89h9.8v-9.8h-9.8Zm-11.3 0H55v-9.8h-9.8ZM34 89h9.8v-9.8H34Zm-11.4 0h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8h-9.8ZM0 89h9.8v-9.8H0Zm11.3 11.3h9.8v-9.8h-9.8Zm-11.3 0h9.8v-9.8H0Zm0 11.3h9.8v-9.8H0Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    >
                </g >
                <g
                    bind:this={logo_g}
                    id="digit-1-1716218048434"
                    transform="translate(137, 20)"
                    style="filter: url(&quot;#motionFilter-1-1716218048434&quot;);"
                    ><g style="transform: translate(0px, 0px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -152px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -304px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -456px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -608px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -760px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -912px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -1064px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -1216px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -1368px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    ><g style="transform: translate(0px, -1520px);"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="113"
                            height="112"
                            ><path
                                d="M.3 32.4h9.8v-9.8H.3Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#e61973;fill-opacity:1"
                            ></path><path
                                d="M22.8 9.8h9.7V0h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ffb919;fill-opacity:1"
                            ></path><path
                                d="M11.6 100.3h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#1987e6;fill-opacity:1"
                            ></path><path
                                d="M79 111.6h9.7v-9.8h-9.8Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff4b00;fill-opacity:1"
                            ></path><path
                                d="M101.4 55h9.7v-9.7h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#14e691;fill-opacity:1"
                            ></path><path
                                d="M101.4 89h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#ff1928;fill-opacity:1"
                            ></path><path
                                d="M67.7 9.8h9.7V0h-9.7Zm-11.2 0h9.7V0h-9.7Zm-11.3 0H55V0h-9.8ZM34 9.8h9.8V0H34Zm33.7 11.3h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm56.2 0h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm0 11.3h9.7V34h-9.7Zm-11.3 0h9.8V34H.3Zm11.3 11.4h9.7v-9.9h-9.7Zm78.6 0h9.7v-9.9h-9.7Zm-11.3 0h9.8v-9.9h-9.8Zm-11.2 0h9.7v-9.9h-9.7Zm-11.2 0h9.7v-9.9h-9.7ZM.3 55h9.8v-9.9H.3ZM79 66.4h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-45 0h9.8v-9.8h-9.7Zm89.9 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3Zm101 11.3h9.8v-9.8h-9.7Zm-89.7 0h9.7v-9.8h-9.7Zm78.6 0h9.7v-9.8h-9.7Zm-89.9 0h9.8v-9.8H.3ZM90.2 89h9.7v-9.8h-9.7ZM.3 89h9.8v-9.8H.3ZM79 89h9.8v-9.8h-9.8Zm-56.1 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm78.6 11.3h9.7v-9.8h-9.7Zm-11.3 0h9.8v-9.8h-9.8Zm-11.2 0h9.7v-9.8h-9.7Zm-11.2 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm45 11.3h9.6v-9.8h-9.7Zm-11.3 0h9.7v-9.8h-9.7Zm-11.3 0H55v-9.8h-9.8Zm-11.2 0h9.8v-9.8H34Zm-11.2 0h9.7v-9.8h-9.7Zm0 0"
                                style="stroke:none;fill-rule:evenodd;fill:#fff;fill-opacity:1"
                            ></path></svg
                        ></g
                    >
                </g>
            </svg
            ><defs
                ><linearGradient
                    id="gradient-1716218048434"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                    ><stop offset="0" stop-color="white" stop-opacity="0"
                    ></stop><stop
                        offset="0.2"
                        stop-color="white"
                        stop-opacity="1"
                    ></stop><stop
                        offset="0.8"
                        stop-color="white"
                        stop-opacity="1"
                    ></stop><stop offset="1" stop-color="white" stop-opacity="0"
                    ></stop></linearGradient
                ><mask id="mask-1716218048434"
                    ><rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#gradient-1716218048434)"
                    ></rect></mask
                ><filter
                    id="motionFilter-0-1716218048434"
                    width="300%"
                    x="-100%"
                    class="blurValues"
                    in="SourceGraphic"
                    stdDeviation="0 0"
                    ><feGaussianBlur stdDeviation="0 0" bind:this={logo_blur_p}
                    ></feGaussianBlur></filter
                ><filter
                    id="motionFilter-1-1716218048434"
                    width="300%"
                    x="-100%"
                    class="blurValues"
                    in="SourceGraphic"
                    stdDeviation="0 0"
                    ><feGaussianBlur stdDeviation="0 0" bind:this={logo_blur_g}
                    ></feGaussianBlur></filter
                ></defs
            ></svg
        >
        <pre bind:this={pre}
            style="font: 20px Roboto, sans-serif; color: rgb(204, 204, 204); opacity: 0; text-align: center;">{title}</pre>
    </div>
</div>

<style>
    .initial-loader {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #000;
        height: 100%;
        margin: auto;
        position: fixed;
        width: 100%;
        user-select: none;
    }

  
</style>
