/*
Copyright (C): 2010-2019, Shenzhen Yahboom Tech
modified from liusen
load dependency
"Tinybit": "file:../pxt-Tinybit"
*/

//% color="#006400" weight=20 icon="\uf1b9"
namespace Tinybit {

    const PWM_ADD = 0x01
    const MOTOR = 0x02
    const RGB = 0x01
    
    let yahStrip: neopixel.Strip;

    export enum enColor {

        //% blockId="OFF" block="OFF"
        OFF = 0,
        //% blockId="Red" block="Red"
        Red,
        //% blockId="Green" block="Green"
        Green,
        //% blockId="Blue" block="Blue"
        Blue,
        //% blockId="White" block="White"
        White,
        //% blockId="Cyan" block="Cyan"
        Cyan,
        //% blockId="Pinkish" block="Pinkish"
        Pinkish,
        //% blockId="Yellow" block="Yellow"
        Yellow,

    }
    export enum enMusic {

        //% blockId="dadadum" block="dadadum"
        dadadum = 0,
        //% blockId="entertainer" block="entertainer"
        entertainer,
        //% blockId="prelude" block="prelude"
        prelude,
        //% blockId="ode" block="ode"
        ode,
        //% blockId="nyan" block="nyan"
        nyan,
        //% blockId="ringtone" block="ringtone"
        ringtone,
        //% blockId="funk" block="funk"
        funk,
        //% blockId="blues" block="blues"
        blues,
        //% blockId="birthday" block="birthday"
        birthday,
        //% blockId="wedding" block="wedding"
        wedding,
        //% blockId="funereal" block="funereal"
        funereal,
        //% blockId="punchline" block="punchline"
        punchline,
        //% blockId="baddy" block="baddy"
        baddy,
        //% blockId="chase" block="chase"
        chase,
        //% blockId="ba_ding" block="ba_ding"
        ba_ding,
        //% blockId="wawawawaa" block="wawawawaa"
        wawawawaa,
        //% blockId="jump_up" block="jump_up"
        jump_up,
        //% blockId="jump_down" block="jump_down"
        jump_down,
        //% blockId="power_up" block="power_up"
        power_up,
        //% blockId="power_down" block="power_down"
        power_down

    }
    export enum enPos {

        //% blockId="LeftState" block="LeftState"
        LeftState = 0,
        //% blockId="RightState" block="RightState"
        RightState = 1
    }

    export enum enLineState {
        //% blockId="White" block="White Line"
        White = 0,
        //% blockId="Black" block="Black Line"
        Black = 1
    }
    
    
    export enum CarState {
        //% blockId="Car_Run" block="Run"
        Car_Run = 1,
        //% blockId="Car_Back" block="Back"
        Car_Back = 2,
        //% blockId="Car_Left" block="Left"
        Car_Left = 3,
        //% blockId="Car_Right" block="Right"
        Car_Right = 4,
        //% blockId="Car_Stop" block="Stop"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="SpinLeft"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="SpinRight"
        Car_SpinRight = 7
    }

    function setPwmRGB(red: number, green: number, blue: number): void {

        let buf = pins.createBuffer(4);
        buf[0] = RGB;
        buf[1] = red;
        buf[2] = green;
        buf[3] = blue;
        
        pins.i2cWriteBuffer(PWM_ADD, buf);
    }

    function setPwmMotor(mode: number, speed1: number, speed2: number): void {
        if (mode < 0 || mode > 6)
            return;
        
        let buf = pins.createBuffer(5);
        buf[0] = MOTOR;
        switch (mode) { 
            case 0: buf[1] = 0; buf[2] = 0; buf[3] = 0; buf[4] = 0; break;              //stop
            case 1: buf[1] = speed1; buf[2] = 0; buf[3] = speed2; buf[4] = 0; break;    //run
            case 2: buf[1] = 0; buf[2] = speed1; buf[3] = 0; buf[4] = speed2; break;    //back
            case 3: buf[1] = 0; buf[2] = 0; buf[3] = speed2; buf[4] = 0; break;         //left
            case 4: buf[1] = speed1; buf[2] = 0; buf[3] = 0; buf[4] = 0; break;         //right
            case 5: buf[1] = 0; buf[2] = speed1; buf[3] = speed2; buf[4] = 0; break;    //tleft
            case 6: buf[1] = speed1; buf[2] = 0; buf[3] = 0; buf[4] = speed2; break;    //tright
        }
        pins.i2cWriteBuffer(PWM_ADD, buf);
    }
    function stop_the_car(): void { 
        let buff = pins.createBuffer(5);
        buff[0] = MOTOR;

        buff[1] = 0; buff[2] = 0; buff[3] = 0; buff[4] = 0;         //stop
        pins.i2cWriteBuffer(PWM_ADD, buff);
            
    }

    function move_step(): void {
        let buf = pins.createBuffer(5);
        buf[0] = MOTOR;

        //setTimeout(stop_the_car, 5000);

        buf[1] = 100; buf[2] = 0; buf[3] = 100; buf[4] = 0;    //run    
        pins.i2cWriteBuffer(PWM_ADD, buf);

        control.waitMicros(500000);  // 5 seconds
        stop_the_car();

    }

    
    function move_steps(num_steps: number): void {
        let buf = pins.createBuffer(5);
        buf[0] = MOTOR;

        //setTimeout(stop_the_car, 500*num_steps);

        buf[1] = 100; buf[2] = 0; buf[3] = 100; buf[4] = 0;    //run    
        pins.i2cWriteBuffer(PWM_ADD, buf);

        control.waitMicros(500000 * num_steps);  // 5 seconds
        stop_the_car();
    }

    function Car_run(speed1: number, speed2: number) {
        setPwmMotor(1, speed1, speed2);
    }

    function Car_back(speed1: number, speed2: number) {
        setPwmMotor(2, speed1, speed2);
    }

    function Car_left(speed1: number, speed2: number) {
        setPwmMotor(3, speed1, speed2);
    }

    function Car_right(speed1: number, speed2: number) {
        setPwmMotor(4, speed1, speed2);
    }

    function Car_stop() {
        setPwmMotor(0, 0, 0);
    }

    function Car_spinleft(speed1: number, speed2: number) {
        setPwmMotor(5, speed1, speed2);
    } 

    function Car_spinright(speed1: number, speed2: number) {
        setPwmMotor(6, speed1, speed2);
    }

    //% blockId=Tinybit_RGB_Car_Program block="RGB_Car_Program"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Program(): neopixel.Strip {
         
        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P12, 2, NeoPixelMode.RGB);
        }
        return yahStrip;  
    }  

    //% blockId=one_step_forward block="one_step_forward"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function one_step_forward(): void {
         
        move_step(); 
    }

    //% blockId=one_step_backward block="one_step_backward"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function one_step_backward(): void {
         
        move_step(); 
    }

    //% blockId=one_step forward_num_steps block="forward_num_steps|number_of_steps %num_steps"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function forward_num_steps(num_steps: number): void {
         
        move_steps(num_steps); 
    }

    //% blockId=one_step_backward_num_steps block="backward_num_steps|number_of_steps %num_steps"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function backward_num_steps(num_steps: number): void {
         
        move_steps(num_steps); 
    }

    //% blockId=Car_Run block="Car Run|speed1 %speed1|speed2 %speed2"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Car_Run(speed1: number, speed2: number): void {
        Car_run(speed1, speed2);
    }

    //% blockId=Car_Back block="Car Back|speed1 %speed1|speed2 %speed2"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Car_Back(speed1: number, speed2: number): void {
        Car_back(speed1, speed2);
    }

    //% blockId=Car_Left block="Car Left|speed1 %speed1|speed2 %speed2"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Car_Left(speed1: number, speed2: number): void {
        Car_left(speed1, speed2);
    }

    //% blockId=Car_Right block="Car Right|speed1 %speed1|speed2 %speed2"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Car_Right(speed1: number, speed2: number): void {
        Car_right(speed1, speed2);
    }

    //% blockId=Car_Stop block="Car Stop"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Car_Stop(): void {
        Car_stop();
    }

    //% blockId=Car_SpinLeft block="Car Spin Left|speed1 %speed1|speed2 %speed2"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Car_SpinLeft(speed1: number, speed2: number): void {
        Car_spinleft(speed1, speed2);
    }

    //% blockId=Car_SpinRight block="Car Spin Right|speed1 %speed1|speed2 %speed2"
    //% weight=99
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Car_SpinRight(speed1: number, speed2: number): void {
        Car_spinright(speed1, speed2);
    }

}
