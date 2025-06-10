
export function show() {
    shows[Math.floor((Math.random() * shows.length))]();
}

export const shows = [

    () => {
        osc(23)
            .rotate(Math.PI)
            .color([1, 2, 3].fast(0.2), [2, 3, 1].fast(0.7), [3, 1, 2].fast(0.3))
            .saturate((() => (1.05 - (Math.sin(time)))))
            .diff(
                osc(17)
                    .rotate(Math.PI / 4)
                    .brightness(() => (1.25 - (0.8 * Math.sin(time / 13))))
            )
            .diff(
                osc(19)
                    .rotate(Math.PI / 2)
                    .contrast(() => (1.35 - (0.8 * Math.sin(time / 19))))
            )
            .mult(src(o0)
                .rotate(() => (Math.sin(time / 15)))
                .kaleid(() => (2 + ((time / 8) & 15)))
                .repeat(() => (1 + ((time / 5) & 7)))
                .scroll(() => (Math.sin(time / 7) / 5), () => (Math.cos(time / 11) / 5))
                .scale(0.8, 1, 1)
                .rotate(() => (Math.sin(time / 4) * 3))
                .contrast(() => (0.4 - (0.3 * Math.cos(time / 5))))
                .colorama([.035, 0.1, 0.001].fast(0.2), [0.001, .035, 0.1].fast(0.3), [0.1, 0.001, .035].fast(0.5))
            )
            .out(o0)
    },

    () => {
        src(o0)
            .repeat([3, 5, 9, 5].fast(0.08))
            .blend(
                osc([3, 8, 18, 8].fast(0.4)).mask(shape([3, 4, 5, 4].fast(0.4), 0.85).color([1.5, 0.2].fast(0.3), [1.5, 0.23].fast(0.5), [0.5, 1.2].fast(0.7), 1), 0.2)
                    .scroll([0.125, .25].fast(0.1), [.25, 0.125].fast(0.07))
                    .add(shape([5, 3, 4, 7, 4, 3].fast(0.25), 0.75).color([0.2, 2].fast(0.7), [0.2, 2].fast(0.3), [0.2, 2].fast(0.5), 1))
                    .diff(osc([9, 2, 14, 2].fast(0.12)).color([0.1, 2.3].fast(0.17), [0.1, 2.3].fast(0.13), [0.1, 2.3].fast(0.15), 1))
                    .saturate(() => (1.2 + Math.cos(time * 4)))
                    .contrast(() => (1.6 + Math.cos(time / 6)))
                    .rotate(() => (-time / 2))
                , () => (0.3 + (0.34 * (1 + Math.sin(time / 37)))))
            .mask(osc([0.2, 12, 7, 12].fast(0.08)))
            .rotate(() => (time / 6))
            .kaleid([6, 8, 10, 12, 10, 8].fast(0.3))
            .scroll(() => (4.5 * Math.cos(time / 37)), () => (4.5 * Math.cos(time / 49)))
            .scale(() => (0.2 * (2 + Math.sin(time / 11))))
            .rotate(() => (time / 27))
            .out(o0)
    },

    () => {
        const myPi = Math.PI
        function c(t) { return 1.2 * (1 + Math.sin(t)) }
        function l(t) { return 0.3 * (1 + Math.sin(t)) }
        src(o0)
            .diff(
                osc(() => (((time / 157) % 11) + 3))
                    .color(() => c(time), () => c(time / 3), 1)
                    .rotate(() => -(time / 32))
                    .kaleid(() => (2 + c(time / 13)))
                    .scale(() => (0.45 + l(time / 87)))
                    .repeat(() => (2 + ((time / 73) % 8)))
                    .modulate(osc(() => ((c(time / 17) + c(time / 19) + c(time / 29)) / 8), 0, 0))
                    .contrast(3)
            )
            .rotate(() => (time / 17))
            .modulate(noise(() => c(time / 7)))
            .kaleid(() => (2 + c(time / 31)))
            .rotate(() => (time / 11))
            .invert()
            .out(o0)
    },

    () => {
        osc(17, 0.03, 2)
            .mult(osc(14, -0.03, 3), 5)
            .kaleid(88)
            .invert(0.725)
            .luma(0.85, 0)
            .posterize(() => 7 + (4 * Math.cos(time / 3)), () => 5 + (4 * Math.sin(time / 2)))
            .scroll(0.5, 0.5, 0, 0)
            .mult(src(o0)
                .pixelate(() => 8 + (time & 15), () => 8 + (time & 7)), 0.925)
            .add(src(o0)
                .kaleid(4)
                .invert(), 0.38)
            .mult(shape(4, 0.4, 0.82)
                .mask(shape(8, 0.9, 0))
                .rotate(() => time * 1.23)
                .repeat(178, 99)
                .modulate(noise(3, 0.2), 0.012), 0.135)
            .modulateRotate(shape(88, 0.1, () => 1.2 + Math.cos(time / 11))
                .invert(), () => 3 * Math.sin(time / 17))
            .blend(shape(4, 0.825, 0.02)
                .repeat(77, 39), 0.035)
            .rotate(() => -time / 59)
            .out(o0)
    },

    () => {
        osc(9, 0.05, 2)
            .rotate(Math.PI / 2)
            .modulateScale(osc(29, 0.01, 0)
                .modulate(noise(6, 0.002), 0.2), 0.6)
            .luma(0.2, 0)
            .posterize(7, 1)
            .saturate(() => 0.8 + (0.6 * Math.cos(time / 3)))
            .blend(
                src(o0)
                    .pixelate(32, 18)
                    .modulateScale(shape(88, 0.0001, 3)
                        .repeat(32, 18), 0.8)
                    .modulate(noise(3, 0.012), 0.22)
                    .add(shape(6, 0.7, 0.3)
                        .repeat(70, 38)
                        .scrollX(0.1, 0.006)
                        .modulate(noise(2, 0.03), 0.2), 0.08)
                    .contrast(2), () => 0.28 + (0.22 * Math.sin(time)))
            .out(o0)
    },

    () => {
        shape(88, 0.75, 0.86)
            .scale(1, 0.65, 0.4, 0.2, 0.5)
            .repeat(8, 1)
            .scrollX(0.1, -0.215)
            .diff(shape(4, 1, 0)
                .mult(osc(7, .0082, () => 11 + (((time / Math.ceil(2 + Math.cos(time)))) & 3))
                    .invert(() => Math.cos(time / 3.25)), 1.3)
                .scale(1, 2, 0.6, 0.5, 0.5))
            .modulateScale(osc(7, 0.3, 0), 0.25)
            .luma(0.35, 0)
            .modulateRotate(
                shape(9, () => Math.cos(time), 2)
                    .invert(() => Math.cos(time / 9))
                    .rotate(() => time / 5), () => Math.PI / (3 + Math.sin(time / 2)), () => -time / 7
            )
            .diff(shape(4, 0.8, 0.22)
                .scale(1, 0.5, 0.5, 0, 0)
                .add(shape(4, 0.8, 0.22)
                    .scale(1, 0.5, 0.5, 1, 1))
                .repeat(6, 3)
                .diff(noise(3, 0.1)
                    .thresh(0.35, 0)
                    .pixelate(12, 6))
                .modulateScrollY(noise(5, 0.3)
                    .pixelate(() => 12 / (1 + (time & 3)), 1)
                    .luma(0.15, 0), 0.45, 0)
                .mult(osc(14, -0.15, 7)
                    .modulate(noise(9, .01), 1)
                    .pixelate(960, 2)
                    .contrast(0.6), 2)
            )
            .contrast(3)
            .sub(src(o0)
                .scale(1, 1.1, 1.1, 0.5, 0.5), 0.35)
            .out(o0)
    },

    () => {
        osc(3, 0.33, 2)
            .mult(shape(4, 1, 0.1)
                .scale(1, 1, 0.185, 0.5, 0.5)
                .modulateScale(osc(37, 0.05, 0), 0.2)
            )
            .modulateRotate(
                shape(4, 1, () => 1.85 + Math.sin(time))
                    .scale(1, 0.25, 1, 0.5, 0.5), () => Math.cos(time / 3), 0
            )
            .sub(
                src(o0)
                    .scale(1, 1, 0.88, 0.5, 0.5), 0.36
            )
            .saturate(2.3)
            .diff(
                shape(4, 1, 0.6)
                    .scale(1, 1, 0.4, 0.5, 0.5)
                    .scrollY(1, -0.063)
                    .mask(osc(87, 0.025, 0)
                        .rotate(Math.PI / 2)
                        .thresh(0.5, 0))
            )
            .sub(noise(477, 33)
                .mult(osc(6, 0.1, 2)
                    .rotate(Math.PI), 2.25)
                .scale(1, 1, 1.85, 0.5, 0.5), 0.0975)
            .invert()
            .blend(src(o0)
                .pixelate(80, 40)
                .luma(0.6, 0)
                .saturate(2)
                .modulate(noise(6, 3), 0.0125), 0.1)
            .out(o0)
    },

    () => {
        speed = 0.25
        shape(4, 1.5, 0)
            .scale(1, 1, 0.3, 0.5, 0.5)
            .mask(
                osc(4, -0.6, 0)
                    .thresh(0.5, 0)
            )
            .repeat(() => 5 + (3 * Math.cos(time / 7)), 3)
            .modulateScrollY(osc(18, 0.075, 0), 1)
            .diff(osc(() => 53 + (17 * Math.sin(time / 9)), 0.0032, 0)
                .rotate(Math.PI / 2)
                .thresh(0.8, 0))
            .modulateRotate(shape(3, 0.1, 0.8)
                .rotate(() => time), 0.2)
            .invert()
            .add(
                osc(37, .02, () => 5 + Math.sin(time))
                    .modulate(noise(7), 0.2)
                    .mask(
                        src(o0)
                    )
                    .pixelate(17, 8)
                    .mult(shape(88, 0.68, () => 0.3 + (0.175 * Math.sin(time / 3)))
                        .repeat(17, 8), () => 2 + (1.5 * Math.cos(time / 2)))
                    .saturate(() => 3 + (2 * Math.cos(time))), 0.86
            )
            .contrast(1.2)
            .out(o0)
    },

    () => {
        osc(287, 0.006, 0)
            .thresh(0.5, 0)
            .kaleid(88)
            .modulateScale(
                osc(13, 0.02, 0)
                    .rotate(Math.PI / 2)
                    .kaleid(12), 2
            )
            .mask(
                osc(287, -0.01, 0)
                    .thresh(0.15, 0)
                    .kaleid(88)
            )
            .modulateRotate(
                osc(187, 0.01, 0)
                    .kaleid(88)
                    .mult(shape(188, 0.1, 0.85)), () => (Math.cos(time / 3) / 1.65)
            )
            .scale(1, 1, 1.83, 0.5, 0.5)
            .blend(src(o0)
                .mult(osc(7, -0.062, () => 2 + Math.sin(time / 2))
                    .rotate(() => time / 7)
                    .kaleid(12)
                    .saturate(1.15), 1.25), 0.75)
            .contrast(1.15)
            .out(o0)
    },

    () => {
        osc(83, 0.015, () => (2.75 + (Math.sin(time / 3))))
            .luma(0.25, 0.2)
            .kaleid(88)
            .scale(1, 1, 1.835, 0.5, 0.5)
            .modulate(voronoi(2, 0.3, 4))
            .contrast(6)
            .saturate(0.85)
            .mask(
                shape(() => 4 + ((time / 6) & 2), 0.5, 0.25)
                    .scroll(0.25, 0.25, 0.096, 0)
                    .add(shape(() => 4 + ((time / 5) & 2), 0.5, 0.25)
                        .scroll(0.25, 0.25, 0, 0.066)
                        .rotate(Math.PI))
                    .repeat(15, 8)
                    .invert(() => (1 + Math.cos(time / 3)))
                    .modulateRotate(
                        shape(188, 0.02, 1.4), () => Math.sin(time / 17) * 1.7
                    )
            )
            .out(o0)
    },

    () => {
        osc(38, 0.1, () => 3 + Math.cos(time))
            .rotate(Math.PI / 2)
            .mask(
                osc(137, 0.02, 0)
                    .thresh(() => 0.5 + (Math.sin(time / 5) / 4), 0)
                    .modulateScrollX(
                        osc(14, 0, 0)
                            .rotate(Math.PI / 2), 0.2)
            )
            .kaleid(() => (2.05 + Math.sin(time / 3)))
            .scroll(0, 0.5, 0, 0)
            .rotate(Math.PI / 2)
            .modulateScale(shape(88, 0.02, 1)
                .invert(() => Math.cos(time / 11))
                .diff(shape(4, 1, 0)), 2)
            .blend(src(o0)
                .scroll(0, -0.00625, 0, 0)
                .scale(1, 1.025, 1, 0.5, 0.5)
                .saturate(1.125)
                , 0.84)
            .add(osc(137, 0.02, 0)
                .thresh(0.975, 0)
                .kaleid(88)
            )
            .out(o0)
        render(o0)
    },

    () => {
        update = () => speed = 0.4 + (0.39 * Math.cos(time))
        osc(17, 0, 0)
            .modulateScale(
                shape(4, 0.5, 0.5)
                    .scrollX(0.5, 0)
                    .rotate(Math.PI / 2)
                    .diff(shape(4, 1, 0)
                        .scale(1, 1, [0.025, 0.85].smooth(), 0.5, 0.5)
                        .scroll(0, 1, 0, -1)), [0.15, 0.65].smooth(), 0.05)
            .mult(osc(13, 0.725, 4)
                .rotate(Math.PI / 2))
            .invert()
            .sub(noise(160, 0.02), 0.025)
            .saturate(1.65)
            .contrast(1.125)
            .sub(src(o0)
                .scale(1.85, 1, 1, 0.5, 0.5), 0.925)
            .kaleid([7, 11, 23, 17, 9].fast(2))
            .modulate(noise([1, 4].smooth(), 0.25)
                .rotate(() => time * 2), 0.085)
            .rotate(() => -time)
            .out(o0)
    },

    () => {
        src(o0)
            .rotate(-Math.PI / 847)
            .scale(1, 1.01, 1.01, 0.5, 0.5)
            .contrast(1.025)
            .modulateRotate(shape(88, 0.05, 0.6)
                .invert(), 0.01)
            .modulate(noise(3), 0.006)
            .layer(
                osc(17, .02, () => 2 + Math.sin(time / 7))
                    .mask(shape(4, 0.1, 0)
                        .scale(1, 10, .02, 0.5, 0.5))
                    .pixelate(18, 11)
                    .modulateScrollY(osc(11, 0.125, 0), 0.085)
                    .rotate(() => -(time))
                    .modulateRotate(noise(977), 0.38)
                    .kaleid(() => (3 + (time & 7)))
            )
            .blend(src(o0)
                .saturate(0.975), 0.64)
            .out(o0)
    },

    () => {
        osc(31, -0.01, 0)
            .thresh(0.5, 0.6)
            .rotate(Math.PI / 6)
            .diff(osc(2, 0.1, () => (1 + ((time / 9) & 5))))
            .modulateScrollX(osc(7, 0.01, 0)
                .thresh(0.5, 0.2))
            .rotate(Math.PI / 6)
            .modulateScrollX(osc(7, -0.01, 0)
                .thresh(0.5, 0.3))
            .rotate(Math.PI / 6)
            .modulateScrollX(osc(7, 0.01, 0)
                .thresh(0.5, 0.4))
            .sub(src(o0)
                .scale(() => 0.85 + (Math.sin(time / 5) / 2), 1, 1, 0.5, 0.5)
                .luma(0.85, 0.3)
                .contrast(1.75), 0.175)
            .rotate(() => (time / 57))
            .out(o1)
        src(o1)
            .contrast(1.25)
            .saturate(1.85)
            .out(o0)
    },

    () => {
        solid(() => 1.5 + Math.sin(time / 11), () => 1.5 + Math.cos(time / 13), () => 1.5 + Math.sin(time / 17), 1)
            .mask(
                shape(3, 0.33, 0.02)
            )
            .diff(shape(3, 0.25, 0.01))
            .diff(shape(3, 0.15, 0.005))
            .scrollY(0.33)
            .saturate(2)
            .contrast(2)
            .blend(src(o0)
                .luma(0.125, 0)
                .mult(noise(11), 0.4)
                .rotate(() => Math.PI / (46 + (20 * Math.cos(time / 4))))
                .scale(1.1, 1, 1, 0.5, 0.5), 0.975)
            .kaleid(16)
            .modulate(noise(1.2), 0.25)
            .scale(1.01, 1, 1, 0.5, 0.5)
            .rotate(() => -time / 17)
            .saturate(1.125)
            .out(o1)
        src(o1)
            .invert()
            .contrast(1.05)
            .saturate(1.05)
            .add(osc(1, 0.5, 3)
                .rotate(Math.PI / 4), 0.25)
            .out(o0)
    },

    () => {
        speed = 0.3
        shape(4, 0.5, -0.4)
            .mask(shape(4, 0.5, 0))
            .scroll(0.25, 0.25, 0, 0)
            .add(shape(48, 0.35, 0)
                .color(0.2, 2, 0.2, 1)
                .scroll(-0.25, 0.25, 0, -1.5))
            .out(o1)
        src(o1)
            .scrollX(1, 1)
            .mult(solid(0.5, 1, 2, 1))
            .add(src(o1)
                .scrollX(1, -1)
                .mult(solid(2, 1, 0.5, 1))
                .scroll(0.5, 0.5, 0, 0))
            .scrollY(1, 1)
            .repeat(3, 2)
            .blend(src(o0), 0.7)
            .saturate(1.35)
            .modulate(noise(3), 0.01)
            .rotate(() => (Math.PI / 117))
            .add(src(o0)
                .rotate(() => (Math.PI))
                .invert(), () => ((1 + Math.cos(time * 2)) / 7))
            .out(o0)
    },

    () => {
        speed = 0.65
        osc(14, 0.15, 2)
            .mask(
                shape(4, 0.5, 0)
                    .scroll(0.25, 0.25, 0, 0)
                    .add(
                        shape(4, 0.5, 0)
                            .scroll(0.75, 0.75, 0, 0)
                    )
                    .repeat(() => (5 + ((time / 5) % 17)), () => (3 + ((time / 7) % 11)))
                    .rotate(() => (time / 17))
            )
            .saturate(() => (1.5 - Math.cos(time / 2.5)))
            .scroll(() => (Math.sin(time / 5)), () => (Math.cos(time / 7)), 0.00125, 0.00125)
            .mult(osc(8, 0.085, 11)
                .kaleid(() => (4 + Math.sin(time)))
                .rotate(time * 3)
                .saturate(() => (1.5 - Math.sin(time / 5))))
            .modulate(noise(() => (2 + Math.cos(time / 27))))
            .add(src(o0)
                .scale(1, 1.0083, 1.0083, 0.5, 0.5), 0.825)
            .out(o0)
    },

    () => {
        function vblock(n, i, z) {
            return shape(4, 1, 0)
                .scale(1, 1 / n, 1, i / (n - 1), 0)
                .color(0, z, 0, 0);
        }
        function bsy() {
            return osc(47, -0.03, 0)
                .rotate(() => (time / 17))
                .kaleid(48)
                .thresh(0.7, 0.3)
                .mask(shape(78, 1, 0));
        }
        function tapes() {
            return src(o1)
                .modulate(src(o2), 2)
                .modulate(osc(5, 0.3, 0)
                    .rotate(Math.PI / 2));
        }
        shape(4, 1, 0)
            .sub(shape(4, 0.95, 0))
            .add(bsy()
                .scale(1, 0.75, 0.75,
                    () => (0.5 + (Math.sin(time * 1.1) / 2)),
                    () => (0.5 + (Math.cos(time * 1.73) / 2))
                )
                .scroll(1, 1, -0.3, 0.4), 1)
            .add(src(o0)
                .saturate(3)
                .contrast(2), 0.085)
            .repeat(6, 6)
            .out(o1)
        vblock(6, 0, () => (0.5 + (Math.sin(time / 2) / 2)))
            .add(vblock(6, 1, () => (0.5 + (Math.sin(time / 2.2) / 2))), 1)
            .add(vblock(6, 2, () => (0.5 + (Math.sin(time / 2.7) / 2))), 1)
            .add(vblock(6, 3, () => (0.5 + (Math.sin(time / 2.5) / 2))), 1)
            .add(vblock(6, 4, () => (0.5 + (Math.sin(time / 2.1) / 2))), 1)
            .add(vblock(6, 5, () => (0.5 + (Math.sin(time / 2.8) / 2))), 1)
            .out(o2)
        tapes()
            .scale(1, 1.015, 1.01, 0.5, 0.5)
            .sub(
                tapes(), () => (0.73 + (Math.sin(time / 3.3) / 3))
            )
            .mask(osc(4, 0.15, 3)
                .rotate(Math.PI / 2)
                .saturate(1.5), 0.85)
            .diff(osc(0.8, -0.33, () => (10 + Math.sin(time / 4))))
            .scale(1, 1, 1.72, 0.5, 0.5)
            .contrast(0.55)
            .saturate(1.2)
            .out(o0)
        render(o0)
    },

    () => {
        shape(4, 1, 0.3)
            .sub(shape(4, 0.96, 0))
            .scale(1, 1, 1, 0, 0)
            .invert()
            .blend(src(o1)
                .scale(1, 0.9, 0.9, 0.5, 0.5), 0.63)
            .out(o1)
        shape(4, 1, 0)
            .color(0, 1, 0)
            .scale(1, 0.5, 1, 0, 0)
            .repeatX(9)
            .out(o2)
        shape(4, 1, .7)
            .color(0.4, () => ((time / 9) & 1), 0.2)
            .scale(1, 0.33, 1, 0, 0)
            .invert(() => ((time / 7) & 1) / 3)
            .add(shape(4, 1, .7)
                .color(() => ((time / 3) & 1), 0.2, 0.4)
                .scale(1, 0.33, 1, 0.5, 0))
            .invert(() => ((time / 5) & 1) / 3)
            .add(shape(4, 1, .7)
                .color(0.2, 0.4, () => ((time / 5) & 1))
                .scale(1, 0.33, 1, 1, 0))
            .invert(() => ((time / 9) & 1) / 3)
            .repeatX(3)
            .out(o3)
        src(o1)
            .repeat(18, 10)
            .mult(src(o3))
            .modulate(
                src(o2), 0.055
            )
            .mask(osc(288, 0, 0)
                .rotate(Math.PI / 2)
                .thresh(0.05, 0.01)
                .scroll(0, 1, 0, -0.086))
            .scroll(0, 1, 0, .075)
            .rotate(() => (time / 12))
            .kaleid(6)
            .scale(1, 1, 1.82, 0, -0.12)
            .saturate(7)
            .contrast(2)
            .blend(src(o0)
                .scale(1, 1.14, 1.14, 0.5, 0.5), .45)
            .out(o0)
        render(o0)
    },

    () => {
        function f1() {
            return shape(3, 0.375, 0.35)
                .color(0, 2, 0, 0)
                .rotate(Math.PI)
                .repeat([3, 5, 7, 9, 11, 9, 7, 5].smooth(), 1)
                .scrollY([0.22, -0.2].smooth(0.6), 0);
        }
        function f2(n1, n2) {
            return osc(n1, n2, 0)
                .color(0, 2, 0, 0);
        }
        function f3() {
            return osc(23, -0.02, 0)
                .rotate(Math.PI / 2)
                .color(2, 0, 0, 0);
        }
        shape(4, 1, 0.35)
            .scale(1, 1, 0.085, 0.5, 0.5)
            .modulate(f1(), 0.15)
            .modulate(f2(17, [-0.12, 0, 0.12].fast()), 0.08)
            .modulate(f3(), [-0.05 - 0.008, 0.008, 0.05].smooth())
            .scrollY(-0.225, 0)
            .scale(1, 1, 1.6, 0.5, 0.5)
            .out(o1)
        src(o1)
            .scale(1, 1.07, 1.07, 0.5, 0.5)
            .sub(osc(5, 0.2, 9)
                .mask(src(o1)
                    .scale(1, 1.03, 1.03, 0.5, 0.5)), 1.5)
            .add(src(o0)
                .scale(1, 1.12, 1.12, 0.5, 0.5)
                .mult(osc(5, -0.03, 3))
                .saturate(1.3)
                .rotate(() => (-time / 76))
                .scale(1, 1, 1.82, 0.5, 0.5), 0.4)
            .diff(src(o1)
                .mult(osc(3, -0.02, 11)
                    .rotate(Math.PI / 2), 1)
                .saturate(3)
            )
            .blend(src(o0)
                .scale(1, 1.402, 1.402, 0.5, 0.5), 0.15)
            .invert()
            .saturate(1.5)
            .out(o0)
        render(o0)
    },

    () => {
        function f1(n1, n2, n3) {
            return osc(n1, n2, 0)
                .mult(solid(0, 1, 0))
                .luma(() => (0.6 + (Math.sin(time / n3) * 0.3)), 0.25);
        }
        function f2(n1, n2) {
            return shape(4, 1, 0.6)
                .scale(1, 1, n1 * 4, 0, n2);
        }
        f2(0.05, 0.55)
            .modulate(f1(11, 0.2, .3), 0.25)
            .diff(
                f2(0.05, 0.55)
                    .modulate(f1(13, -0.3, .5), 0.25)
                    .scale(1, 1, -1, 0, 0.5)
            )
            .diff(
                f2(0.025, 0.75)
                    .modulate(f1(7, -0.07, .9), 0.6)
                    .diff(
                        f2(0.025, 0.75)
                            .modulate(f1(3, 0.05, .7), 0.6)
                            .scale(1, 1, -1, 0, 0.5)
                    )
            )
            .out(o1)
        osc(3, -0.1, 14)
            .rotate(Math.PI / 2)
            .saturate(0.4)
            .sub(
                osc(13, 0.03, 7)
                    .mask(
                        src(o1)
                            .diff(src(o1)
                                .kaleid(2)
                                .kaleid(2)
                                .rotate(Math.PI / 2)
                            )
                    )
                    .add(src(o0)
                        .modulateScale(src(o1), 0.01)
                        .modulateRotate(src(o1), 0.3)
                        .saturate(1.2), [0.22, 0.66, 0.82, 0.77, 0.44, 0.33].smooth(0.8))
                , 0.45)
            .contrast(1.65)
            .saturate(1.1)
            .out(o0)
    },

    () => {
        function f1() {
            return shape(4, 1, 2)
                .scale(1, 1, 0.025)
        }
        function f2(n1, n2, n3) {
            return osc(n1, n2, 0)
                .color(0, n3, 0, 0)
        }
        function f3(n1, n2, n3) {
            let nn = n2 - n1;
            return n1 + (nn / 2) + (nn * Math.sin(time / n3) / 2);
        }
        osc(13, 0.085, 11)
            .mask(
                f1()
                    .modulate(f2(37, 0.02, () => (f3(0.8, 2, 2)))
                        .luma(() => (f3(0, 0.75, 5)), 0), 2)
                    .add(
                        f1()
                            .modulate(f2(43, -0.075, 1.2), 0.15)
                    )
            )
            .scroll(0, () => (f3(0.33, 0.45, 0.7)), 0, 0)
            .blend(
                src(o0)
                    .scale(1, 0.68, 0.62, () => f3(0.1, 0.5, 5), () => f3(0.2, 0.8, 7))
                    .saturate(1.3), 0.25
            )
            .kaleid(2)
            .mult(solid(3, 3, 3))
            .scrollX(0.1, .01)
            .rotate(() => (time / 27))
            .out(o0)
    },

    () => {
        function plate(kn, rn, cn) {
            return (
                osc([11, 37, 17, 58, 19].fast(0.2), -0.01, 0)
                    .modulate(osc(13, 0.08, 0)
                        .rotate(Math.PI / 2), 0.08)
                    .thresh(0.5, 0)
                    .kaleid(kn)
                    .add(shape(cn, rn, 0)
                        .sub(shape(cn, rn * 0.95, 0)))
                    .mask(shape(cn, rn, 0))
            )
        }
        src(o0)
            .blend(
                plate([3, 5, 8, 4].fast(0.6), 0.95, 8)
                    .rotate(() => (time / 13)), 0.5)
            .diff(
                osc(4, 0.1, 1)
                    .mask(
                        plate(6, 0.95, 128)
                            .rotate(() => (-time / 13))
                            .scroll(0.25, 0.25, .02, .036)
                    )
            )
            .diff(
                osc(2, 0.1, 2)
                    .mask(
                        plate(8, 0.95, 128)
                            .rotate(() => (-time / 13))
                            .scroll(-0.25, 0.25, -.036, .02)
                    )
            )
            .diff(
                osc(4, 0.1, 3)
                    .mask(
                        plate(4, 0.95, 128)
                            .rotate(() => (-time / 13))
                            .scroll(-0.25, -0.25, -.02, -.036)
                    )
            )
            .diff(
                osc(2, 0.1, 4)
                    .mask(
                        plate(10, 0.95, 128)
                            .rotate(() => (-time / 13))
                            .scroll(0.25, -0.25, .036, -.02)
                    )
            )
            .add(src(o0)
                .scale(1.02, 1.02)
                .rotate(Math.PI / 19), 0.125)
            .add(src(o0)
                .scale(0.99, 0.99)
                .rotate(-Math.PI / 19), 0.125)
            .saturate(() => ((2 + Math.sin(time * 2)) / 3.75))
            .hue(() => (time / 5))
            .out(o0)
    },

    () => {
        osc(35, 0.02, () => (2 + Math.cos(time / 17)))
            .mask(
                shape(4, 1, 3)
                    .scale(1, 1.5, 0.025)
                    .rotate(() => (-time / 37))
                    .modulate(
                        osc(19, 0.06, 0)
                            .color(0.75, 0.5, 0)
                            .sub(solid(0.25, 0.5, 0))
                            .pixelate(() => ((2 + Math.sin(time / 17)) * 23)), 0.5)
            )
            .saturate(2)
            .modulate(noise(1.8), 0.35)
            .add(
                src(o0)
                    .rotate(() => (time / 432))
                    .scale(1, 1.001, 1.001, 0, 0)
                    .modulate(noise(0.85), 0.02), 0.925
            )
            .add(solid(() => (time % 9), () => ((time + 3) % 9), () => ((time + 6) % 9))
                .mask(noise(3, 0.6)), 0.05)
            .out(o0)
    },

    () => {
        update = () => { speed = 1.2 + Math.cos(time) }
        shape(4, 0.6, 0.2)
            .modulate(osc(() => (13 * (2 + (Math.sin(time / 103)))), 0.002, 0)
                .color(0, 1, 0), () => ((time % 27) / 177))
            .repeat(() => 1 + (2 * ((time / 3) & 1)), () => 1 + (2 * ((time / 5) & 1)))
            .sub(
                src(o1)
                    .scroll(0, () => ((2.5 + (Math.sin(time / 13))) / 11), 0, 0)
                , () => (((time / 7) & 1) / (0.1 + (((time * 13) & 3) / 3.75)))
            )
            .thresh(1, 0.16)
            .out(o1)
        src(o1)
            .diff(src(o1)
                .rotate(Math.PI / 2)
                .scroll(0.5, 0.5, 0, 0))
            .rotate(() => ((time / 7) & 15))
            .mult(solid(2, 2, 3, 0))
            .diff(src(o1)
                .scale(1, 1.25, 1))
            .mult(solid(3, 2, 2, 0))
            .diff(osc(5, -0.1, () => ((time / 9) % 7)))
            .diff(
                src(o0)
                    //.rotate(()=>(time/17))
                    .scale(0.8, 1, 1)
                    .luma(0.99, 0.8), 0.25
            )
            .out(o0)
    },

    () => {
        osc(4, 0.02, 4)
            .add(
                osc(5, -0.02, 4)
                    .rotate(Math.PI / 2)
            )
            .sub(
                osc(7, 0.06, 4)
                    .rotate(Math.PI / 4)
            )
            .sub(
                osc(8, -0.06, 4)
                    .rotate(-Math.PI / 4)
            )
            .mask(
                shape(4, 0.96, 0)
                    .scroll(0.2, 0, 0.1)
                    .rotate(() => (time / 7))
            )
            .diff(
                src(o0)
                    .scroll(
                        () => (Math.sin(time / 17) / 3),
                        () => (Math.cos(time / 19) / 3),
                        .001)
                    .scale(0.99, 1, 1)
                    .luma(0.75, 0.2)
            )
            .out(o0)
        src(o0)
            .scroll(-0.15, 0.15, 0.13)
            .repeat([1, 2, 5, 3].fast(0.03), [5, 2, 1, 3].fast(0.05))
            .kaleid(() => (28 + (22 * Math.cos(time / 11))))
            .rotate(() => (Math.sin(time / 19) * 8))
            .scale(1, 1, 1.8)
            .contrast(() => (1.8 + Math.sin(time / 3)))
            .out(o1)
        render(o1)
    },

    () => {
        let ranged = (a, b, s) => (a + (Math.abs(b - a) / 2) + (Math.abs(b - a) * s))
        let lin = (s, z) => (((z / 2) - (s % z)) / (z / 2))
        let bull = (a, b) => (
            osc(() => ranged(a, b, Math.sin(time / 3)), 0)
                .modulate(
                    osc(() => ranged(45, 135, lin(time, 5)), 0)
                        .rotate(Math.PI / 2), () => ranged(0.008, 0.001, lin(time, 46))
                )
                .thresh(0.15)
                .kaleid(3)
                .scale(1, 1, 1.82)
        )

        bull(80, 180)
            .mask(
                bull(60, 20)
                    .modulate(osc(78), 0.005)
            )
            .mask(
                bull(180, 80)
                    .scroll(
                        () => ranged(-0.8, 0.8, Math.sin(time / 18)),
                        () => ranged(-0.8, 0.8, Math.cos(time / 24))
                    )
            )
            .scrollX(() => ranged(0, 1, lin(time, 13)))
            .mult(osc(2, 0.15, 2)
                .posterize(3, 2)
                .mask(noise(687, 33)
                    .invert(0.82)
                    .pixelate(1986, 673))
                .saturate(3), 0.6)
            .out()
    },

    () => {
        osc(15, 0.03, 4)
            .sub(osc(12, 0.07, 3)
                .rotate(Math.PI / 2))
            .kaleid(8)
            .pixelate(5, 5)
            .add(
                shape(4, 0.05, 0.025)
                    .scale(1, 1, 20)
                    .modulate(osc(() => (14 + (time / 11) % 31), 0.02, 0)
                        .rotate(Math.PI / 2))
                    .scrollX(() => (Math.sin(time * 2) / 7), 0)
                    .kaleid(6)
                    .scroll([0, 0.5].fast(0.05), [0.5, 0].fast(0.03), 0, 0)
            )
            .add(
                src(o0)
                    .scale(1.3)
                    .invert(0.8), 0.25
            )
            .add(
                src(o0)
                    .scale(0.95)
                    .invert(1.2), 0.25
            )
            .repeat(3, 3)
            .modulate(noise(1.25), 0.18)
            .scale(1, 1, 1.8)
            .out(o0)
    },

    () => {
        const tl = function () {
            return shape(() => ((time & 6) + 4), () => (0.95 + ((1 + Math.sin(time)) / 9)), 0.2);
        }
        osc(3, 0.8, () => (2 + ((time / 6) & 7)))
            .mask(
                tl()
                    .sub(tl()
                        .scale(0.25, 1, 1, 0.5, 0.5)
                        .rotate(() => (time * -1.7)))
            )
            .rotate(() => (time))
            .repeat(71, 71)
            .modulateScrollX(shape(4, 1, 0)
                .scale(1, 1, 0.0125), () => (time / 23))
            .modulateScale(osc(7, 0.03, 0).mask(shape(4, 1, 4)
                .scale(1, 1, 0.0125, 0.5, 0.5)), 2)
            .modulate(noise(30, 0.8), 0.003)
            .modulateScale(osc(3, .2, 0)
                .rotate(() => (time / 27)))
            .modulateScale(osc(3.1, -.2, 0)
                .rotate(() => (time / 31)))
            .modulateScale(osc(4.1, 0.02, 0)
                .rotate(() => (time / 17)))
            .modulateScale(osc(4, -0.02, 0)
                .rotate(() => (time / 19)))
            .rotate(() => (time / 13))
            .sub(src(o0)
                .scale(1.0085, 1, 1, 0.5, 0.025)
                .saturate(1.3), 0.35)
            .contrast(1.2)
            .diff(osc(3, 0.1, () => ((time / 7) & 5))
                .contrast(() => (0.75 + ((time & 3) / 3))))
            .mult(noise(538, 3), 0.085)
            .out(o0)
    }



];

