import subprocess
import threading
import queue

def read_output(stream, callback, stream_type):
    for line in iter(stream.readline, b''):
        callback(line.decode('utf-8'), stream_type)
    stream.close()

def execute_script(script_path, callback):
    process = subprocess.Popen(['python', script_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)

    # Create threads to read stdout and stderr
    stdout_thread = threading.Thread(target=read_output, args=(process.stdout, callback, 'stdout'))
    stderr_thread = threading.Thread(target=read_output, args=(process.stderr, callback, 'stderr'))

    # Start the threads
    stdout_thread.start()
    stderr_thread.start()

    # Wait for the process to finish and threads to complete
    process.wait()
    stdout_thread.join()
    stderr_thread.join()

    # Return the process return code
    return process.returncode

# Example callback function
def output_callback(line, stream_type):
    print(f"Line {line}: [{stream_type}] {line.strip()}")

# Replace 'script_to_execute.py' with the actual name of your script
script_path = 'scripts/number2.py'

# Execute the script and pass the callback function
return_code = execute_script(script_path, output_callback)

# Print the return code
print("Return Code:", return_code)
