// src/components/RangeSlider/RangeSlider.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Input from '../../../../../shared/Input/Input';


const RangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  value = [min, max],
  onChange,
  label,
  showInputs = true,
  formatValue = (val) => val.toString(),
  className = '',
  disabled = false,
  showLabels = true
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const [dragThumb, setDragThumb] = useState(null);
  const sliderRef = useRef(null);
  const dragStartRef = useRef(null);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Calculate positions as percentages
  const getPosition = (val) => ((val - min) / (max - min)) * 100;
  
  const leftPosition = getPosition(localValue[0]);
  const rightPosition = getPosition(localValue[1]);

  // Convert mouse/touch position to value
  const getValueFromPosition = useCallback((clientX) => {
    if (!sliderRef.current) return min;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return min + percentage * (max - min);
  }, [min, max]);

  // Handle range change with smooth validation
  const handleRangeChange = useCallback((newValue, shouldNotify = true) => {
    const constrainedValue = [
      Math.max(min, Math.min(newValue[0], max)),
      Math.min(max, Math.max(newValue[1], min))
    ];
    
    // Ensure values don't cross over but allow smooth movement
    if (constrainedValue[0] > constrainedValue[1]) {
      constrainedValue[0] = constrainedValue[1];
    }
    if (constrainedValue[1] < constrainedValue[0]) {
      constrainedValue[1] = constrainedValue[0];
    }
    
    setLocalValue(constrainedValue);
    
    if (shouldNotify && onChange) {
      // Only apply step rounding when notifying parent
      const steppedValue = [
        Math.round(constrainedValue[0] / step) * step,
        Math.round(constrainedValue[1] / step) * step
      ];
      onChange(steppedValue);
    }
  }, [onChange, min, max, step]);

  // Handle input change
  const handleInputChange = (index) => (e) => {
    const numericValue = Number(e.target.value);
    if (isNaN(numericValue)) return;

    const newValue = [...localValue];
    newValue[index] = numericValue;
    
    // Validate bounds
    if (index === 0 && numericValue > localValue[1]) {
      newValue[1] = numericValue;
    }
    if (index === 1 && numericValue < localValue[0]) {
      newValue[0] = numericValue;
    }
    
    handleRangeChange(newValue);
  };

  // Start drag operation
  const startDrag = useCallback((thumbIndex, clientX) => {
    if (disabled) return;
    
    setIsDragging(true);
    setDragThumb(thumbIndex);
    dragStartRef.current = { thumbIndex, startX: clientX, startValue: localValue[thumbIndex] };
    
    // Prevent text selection
    document.body.style.userSelect = 'none';
  }, [disabled, localValue]);

  // Handle drag movement
  const handleDrag = useCallback((clientX) => {
    if (!isDragging || dragThumb === null) return;
    
    const newValue = getValueFromPosition(clientX);
    const updatedValues = [...localValue];
    updatedValues[dragThumb] = newValue;
    
    handleRangeChange(updatedValues, false); // Don't notify during drag
  }, [isDragging, dragThumb, localValue, getValueFromPosition, handleRangeChange]);

  // End drag operation
  const endDrag = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setDragThumb(null);
    dragStartRef.current = null;
    
    // Restore text selection
    document.body.style.userSelect = '';
    
    // Final notification with stepped values
    const steppedValue = [
      Math.round(localValue[0] / step) * step,
      Math.round(localValue[1] / step) * step
    ];
    onChange?.(steppedValue);
  }, [isDragging, localValue, step, onChange]);

  // Mouse events
  const handleMouseDown = (thumbIndex) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    startDrag(thumbIndex, e.clientX);
  };

  // Touch events
  const handleTouchStart = (thumbIndex) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.touches.length === 1) {
      startDrag(thumbIndex, e.touches[0].clientX);
    }
  };

  // Track click (move nearest thumb)
  const handleTrackClick = (e) => {
    if (disabled || isDragging) return;
    
    const clickValue = getValueFromPosition(e.clientX);
    const distanceToLeft = Math.abs(clickValue - localValue[0]);
    const distanceToRight = Math.abs(clickValue - localValue[1]);
    
    const newValue = [...localValue];
    if (distanceToLeft < distanceToRight) {
      newValue[0] = Math.round(clickValue / step) * step;
    } else {
      newValue[1] = Math.round(clickValue / step) * step;
    }
    
    handleRangeChange(newValue);
  };

  // Global mouse/touch event listeners
  useEffect(() => {
    const handleMouseMove = (e) => handleDrag(e.clientX);
    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        handleDrag(e.touches[0].clientX);
      }
    };
    
    const handleMouseUp = () => endDrag();
    const handleTouchEnd = () => endDrag();

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleDrag, endDrag]);

  return (
    <div className={`${className}`}>
      {/* Header */}
      {label && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        </div>
      )}

      {/* Input Fields */}
      {showInputs && (
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <Input
              type="number"
              value={Math.round(localValue[0] / step) * step}
              onChange={handleInputChange(0)}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className="text-sm"
              fullWidth={true}
              placeholder="Min"
            />
          </div>
          
          <div className="text-gray-400 text-lg shrink-0 px-2">-</div>
          
          <div className="flex-1">
            <Input
              type="number"
              value={Math.round(localValue[1] / step) * step}
              onChange={handleInputChange(1)}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className="text-sm"
              fullWidth={true}
              placeholder="Max"
            />
          </div>
        </div>
      )}

      {/* Slider Container */}
      <div className="space-y-3">
        {/* Slider Track */}
        <div 
          ref={sliderRef}
          className="relative h-6 flex items-center cursor-pointer select-none"
          onClick={handleTrackClick}
        >
          {/* Background Track */}
          <div className="w-full h-2 bg-gray-200 rounded-full"></div>
          
          {/* Active Track */}
          <div
            className="absolute h-2 bg-blue-500 rounded-full transition-all duration-75"
            style={{
              left: `${leftPosition}%`,
              width: `${rightPosition - leftPosition}%`
            }}
          ></div>
          
          {/* Left Thumb */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-grab transform -translate-x-1/2 transition-all duration-150 z-10 ${
              disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-110 hover:shadow-xl active:cursor-grabbing'
            } ${dragThumb === 0 ? 'scale-110 shadow-xl border-blue-600' : ''}`}
            style={{ 
              left: `${leftPosition}%`,
              transition: isDragging && dragThumb === 0 ? 'none' : 'all 150ms ease'
            }}
            onMouseDown={handleMouseDown(0)}
            onTouchStart={handleTouchStart(0)}
          >
            <span className="sr-only">Minimum value thumb: {formatValue(Math.round(localValue[0] / step) * step)}</span>
          </div>
          
          {/* Right Thumb */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-grab transform -translate-x-1/2 transition-all duration-150 z-10 ${
              disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-110 hover:shadow-xl active:cursor-grabbing'
            } ${dragThumb === 1 ? 'scale-110 shadow-xl border-blue-600' : ''}`}
            style={{ 
              left: `${rightPosition}%`,
              transition: isDragging && dragThumb === 1 ? 'none' : 'all 150ms ease'
            }}
            onMouseDown={handleMouseDown(1)}
            onTouchStart={handleTouchStart(1)}
          >
            <span className="sr-only">Maximum value thumb: {formatValue(Math.round(localValue[1] / step) * step)}</span>
          </div>
        </div>

        {/* Min/Max Labels */}
        {showLabels && (
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}
      </div>

      {/* Current Range Display */}
      <div className="mt-4 text-center">
        <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border transition-all duration-200">
          {formatValue(Math.round(localValue[0] / step) * step)} - {formatValue(Math.round(localValue[1] / step) * step)}
        </span>
      </div>
    </div>
  );
};

export default RangeSlider;