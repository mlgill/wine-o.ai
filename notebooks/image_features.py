import cv2
import numpy as np


def resize_image(image, height=None, width=None):
    
    (orig_height, orig_width) = image.shape[:2]
    orig_height = float(orig_height)
    orig_width = float(orig_width)

    if height is not None:
        ratio = height / orig_height
        dim = (int(orig_width * ratio), height)

    elif width is not None:
        ratio = width / orig_width
        dim = (width, int(orig_height * ratio))

    resized = cv2.resize(image, dim, interpolation=cv2.INTER_AREA)
    return resized


def feature_detect_extract(in_path, detector, extractor, width=320, eps=1e-7):
    
    # Read, resize the image and convert to grayscale
    image = cv2.imread(in_path)
    image = resize_image(image, width=320)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Get keypoints and descriptor
    kps = detector.detect(image)
    (kps, descs) = extractor.compute(image, kps)
    
    if len(kps) == 0:
        kps = []
        descs = None
        
    else:
        # Hellinger kernel from http://www.pyimagesearch.com/2015/04/13/implementing-rootsift-in-python-and-opencv/
        descs /= (descs.sum(axis=1, keepdims=True) + eps)
        descs = np.sqrt(descs)
        #descs /= (np.linalg.norm(descs, axis=1, ord=2) + eps)

    return (kps, descs)