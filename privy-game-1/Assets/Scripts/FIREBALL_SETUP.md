# Fireball Setup Guide

## Creating the Fireball Prefab

To complete the fireball functionality, you need to create a Fireball prefab in Unity:

### Step 1: Create the Fireball GameObject

1. Right-click in the Hierarchy
2. Create Empty GameObject
3. Name it "Fireball"

### Step 2: Add Required Components

1. **SpriteRenderer** - For visual representation
2. **Rigidbody2D** - For physics movement
3. **CircleCollider2D** - For collision detection
4. **Fireball Script** - The script we created

### Step 3: Configure Components

#### Rigidbody2D Settings:

- Mass: 0.1
- Linear Drag: 0
- Angular Drag: 0
- Gravity Scale: 0
- Freeze Rotation: ✓ (checked)

#### CircleCollider2D Settings:

- Is Trigger: ✓ (checked)
- Radius: 0.5

#### Fireball Script Settings:

- Speed: 15
- Damage: 30
- Lifetime: 5
- Direction: (1, 0) - will be set by Staff script

### Step 4: Create the Prefab

1. Drag the Fireball GameObject from Hierarchy to Project window
2. This creates a prefab you can assign to the Staff

### Step 5: Assign to Staff

1. Select your Staff GameObject
2. In the Staff component, assign the Fireball prefab to the "Fireball Prefab" field
3. The Fireball Spawn Point will be created automatically

## Usage

- Left-click to cast fireball
- Fireball will launch toward mouse cursor position
- Fireball deals damage on impact and has area damage on explosion
- 1 second cooldown between casts

## Optional Enhancements

- Add particle effects for explosion
- Create custom fireball sprite/art
- Add sound effects
- Implement different fireball types
