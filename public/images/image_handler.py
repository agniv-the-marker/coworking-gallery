import os

def print_file_names(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            print(f"'/images/{directory}/{file}',")

directories = ['daytime', 'nighttime']

for directory in directories:
    print(f"Files in {directory}:")
    print_file_names(directory)
    print()