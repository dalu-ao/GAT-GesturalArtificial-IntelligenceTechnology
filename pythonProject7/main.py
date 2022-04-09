
import cv2
import time
import handTrackingModule as htm
import numpy as np
import tempfile
from PIL import Image
import autopy
from pynput.keyboard import Key, Controller

keyboard = Controller()


def handStuff():
    ##########################
    wCam, hCam = 640, 480
    frameR = 100  # Frame Reduction
    smoothening = 10
    #########################

    pTime = 0
    plocX, plocY = 0, 0
    clocX, clocY = 0, 0

    cap = cv2.VideoCapture(0)
    cap.set(3, wCam)
    cap.set(4, hCam)
    detector = htm.handDetector(maxHands=1)
    wScr, hScr = autopy.screen.size()
    # print(wScr, hScr)

    while True:
        success, img = cap.read()
        img = detector.findHands(img)
        lmList, bbox = detector.findPosition(img)
        # 2. Get the tip of the index and middle fingers
        if len(lmList) != 0:
            x1, y1 = lmList[8][1:]
            x2, y2 = lmList[12][1:]
            # print(x1, y1, x2, y2)

            # 3. Check which fingers are up
            fingers = detector.fingersUp()
            cv2.rectangle(img, (frameR, frameR), (wCam - frameR, hCam - frameR),
                          (255, 0, 255), 2)
            print(fingers)
            if fingers[1] == 1 and fingers[2] == 0:
                x3 = np.interp(x1, (frameR, wCam - frameR), (0, wScr))
                y3 = np.interp(y1, (frameR, hCam - frameR), (0, hScr))

                clocX = plocX + (x3 - plocX) / smoothening
                clocY = plocY + (y3 - plocY) / smoothening

                autopy.mouse.move(wScr - clocX, clocY)
                cv2.circle(img, (x1, y1), 15, (255, 0, 255), cv2.FILLED)
                plocX, plocY = clocX, clocY
            '''
        # 8. Both Index and middle fingers are up : Clicking Mode

            if fingers[1] == 1 and fingers[2] == 1:
        # 9. Find distance between fingers
                length, img, lineInfo = detector.findDistance(8, 12, img)
                print(length)
        # 10. Click mouse if distance short
                if length < 40:
                    cv2.circle(img, (lineInfo[4], lineInfo[5]),
                               15, (0, 255, 0), cv2.FILLED)
                    autopy.mouse.click()
             '''

            if fingers[0] == 1 and fingers[1] == 1 and fingers[2] == 1 and fingers[3] == 1 and fingers[4] == 1:
                print('Click')
                autopy.mouse.click()
                time.sleep(0.5)

            if fingers[0] == 0 and fingers[1] == 0 and fingers[2] == 0 and fingers[3] == 0 and fingers[4] == 0:
                print('Enter')
                keyboard.press(Key.enter)
                keyboard.release(Key.enter)
                time.sleep(0.5)

            if fingers[0] == 0 and fingers[1] == 0 and fingers[2] == 0 and fingers[3] == 0 and fingers[4] == 1:
                print('Delete')
                keyboard.press(Key.backspace)
                keyboard.release(Key.backspace)
                time.sleep(0.1)

            if fingers[0] == 0 and fingers[1] == 1 and fingers[2] == 1 and fingers[3] == 1 and fingers[4] == 1:
                print('Good Bye!')
                keyboard.type('Good Bye!')
                time.sleep(0.5)

            if fingers[0] == 0 and fingers[1] == 1 and fingers[2] == 0 and fingers[3] == 0 and fingers[4] == 1:
                print('Hello!')
                keyboard.type('Hello!')
                time.sleep(0.5)

            if fingers[0] == 0 and fingers[1] == 1 and fingers[2] == 1 and fingers[3] == 0 and fingers[4] == 0:
                print('How are you doing?')
                keyboard.type('How are you doing?')
                time.sleep(0.5)

            if fingers[0] == 0 and fingers[1] == 1 and fingers[2] == 1 and fingers[3] == 1 and fingers[4] == 0:
                print('I am doing good, thanks for asking :)')
                keyboard.type('I am doing good, thanks for asking :)')
                time.sleep(0.5)

            if fingers[0] == 1 and fingers[1] == 1 and fingers[2] == 0 and fingers[3] == 0 and fingers[4] == 1:
                print('I Love You')
                keyboard.type('I Love You')
                time.sleep(0.5)

        # 11. Frame Rate
        cTime = time.time()
        fps = 1 / (cTime - pTime)
        pTime = cTime
        cv2.putText(img, str(int(fps)), (20, 50), cv2.FONT_HERSHEY_PLAIN, 3,
                    (255, 0, 0), 3)
        # 12. Display
        cv2.imshow("Image", img)
        cv2.waitKey(1)


handStuff()

