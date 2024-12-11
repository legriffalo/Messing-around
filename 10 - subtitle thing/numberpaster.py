import pyperclip
import keyboard
from time import sleep

def number_paster(start, end):
    current = start
    print(f"Starting at {start}. Numbers will increment automatically when you paste. Press Ctrl+C to exit.")
    
    # Set initial number in clipboard
    pyperclip.copy(str(current))
    
    def on_paste():
        nonlocal current
        if current <= end:
            # Small delay to allow the paste to complete
            sleep(0.1)
            current += 1
            if current <= end:
                pyperclip.copy(str(current))
                print(f"Ready to paste: {current}")
            else:
                print("Reached the end of the sequence!")
    
    # Register the paste hotkey (Ctrl+V)
    keyboard.on_press_key('v', lambda _: on_paste() if keyboard.is_pressed('ctrl') else None)
    
    try:
        # Keep the script running
        keyboard.wait('ctrl+c')
    except KeyboardInterrupt:
        print("\nStopping...")
    finally:
        keyboard.unhook_all()

# Example usage
start_num = int(input("Enter starting number: "))
end_num = int(input("Enter ending number: "))
number_paster(start_num, end_num)
