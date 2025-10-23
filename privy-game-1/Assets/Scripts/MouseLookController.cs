using UnityEngine;

public class MouseLookController : MonoBehaviour
{
    [Header("Look Settings")]
    [SerializeField] private float lookSpeed = 5f;
    [SerializeField] private bool smoothLook = true;
    [SerializeField] private bool invertY = false;

    [Header("Camera Reference")]
    [SerializeField] private Camera targetCamera;

    [Header("Debug")]
    [SerializeField] private bool showDebugInfo = false;
    [SerializeField] private bool drawLookDirection = true;

    // Private variables
    private Vector2 mousePosition;
    private Vector2 worldMousePosition;
    private Vector2 lookDirection;
    private float targetAngle;
    private float currentAngle;

    void Start()
    {
        // If no camera is assigned, try to find the main camera
        if (targetCamera == null)
        {
            targetCamera = Camera.main;
            if (targetCamera == null)
            {
                targetCamera = FindObjectOfType<Camera>();
            }
        }

        if (targetCamera == null)
        {
            Debug.LogError("MouseLookController: No camera found! Please assign a camera in the inspector.");
            enabled = false;
            return;
        }

        // Initialize current angle to match the object's current rotation
        currentAngle = transform.eulerAngles.z;
        targetAngle = currentAngle;
    }

    void Update()
    {
        HandleMouseInput();
        CalculateLookDirection();
        ApplyRotation();

        if (showDebugInfo)
        {
            Debug.Log($"Mouse Position: {mousePosition}, World Position: {worldMousePosition}, Look Direction: {lookDirection}, Target Angle: {targetAngle:F1}°");
        }
    }

    private void HandleMouseInput()
    {
        // Get mouse position in screen coordinates
        mousePosition = Input.mousePosition;

        // Convert screen position to world position
        worldMousePosition = targetCamera.ScreenToWorldPoint(new Vector3(mousePosition.x, mousePosition.y, targetCamera.nearClipPlane));

        // For 2D top-down view, we only care about X and Y coordinates
        worldMousePosition = new Vector2(worldMousePosition.x, worldMousePosition.y);
    }

    private void CalculateLookDirection()
    {
        // Calculate direction from object to mouse position
        lookDirection = (worldMousePosition - (Vector2)transform.position).normalized;

        // Calculate target angle in degrees
        targetAngle = Mathf.Atan2(lookDirection.y, lookDirection.x) * Mathf.Rad2Deg;

        // Apply Y inversion if enabled
        if (invertY)
        {
            targetAngle = -targetAngle;
        }
    }

    private void ApplyRotation()
    {
        if (smoothLook)
        {
            // Smoothly interpolate to target angle
            currentAngle = Mathf.LerpAngle(currentAngle, targetAngle, lookSpeed * Time.deltaTime);
        }
        else
        {
            // Instant rotation
            currentAngle = targetAngle;
        }

        // Apply rotation (Z-axis for 2D top-down)
        transform.rotation = Quaternion.Euler(0, 0, currentAngle);
    }

    // Public methods for external control
    public void SetLookSpeed(float speed)
    {
        lookSpeed = Mathf.Max(0f, speed);
    }

    public void SetSmoothLook(bool smooth)
    {
        smoothLook = smooth;
    }

    public void SetInvertY(bool invert)
    {
        invertY = invert;
    }

    public void SetTargetCamera(Camera camera)
    {
        targetCamera = camera;
    }

    public Vector2 GetLookDirection()
    {
        return lookDirection;
    }

    public float GetCurrentAngle()
    {
        return currentAngle;
    }

    public float GetTargetAngle()
    {
        return targetAngle;
    }

    public Vector2 GetWorldMousePosition()
    {
        return worldMousePosition;
    }

    // Method to look at a specific world position
    public void LookAt(Vector2 worldPosition)
    {
        Vector2 direction = (worldPosition - (Vector2)transform.position).normalized;
        float angle = Mathf.Atan2(direction.y, direction.x) * Mathf.Rad2Deg;

        if (invertY)
        {
            angle = -angle;
        }

        targetAngle = angle;

        if (!smoothLook)
        {
            currentAngle = targetAngle;
            transform.rotation = Quaternion.Euler(0, 0, currentAngle);
        }
    }

    // Method to set rotation directly
    public void SetRotation(float angle)
    {
        targetAngle = angle;
        currentAngle = angle;
        transform.rotation = Quaternion.Euler(0, 0, angle);
    }

    void OnDrawGizmos()
    {
        if (drawLookDirection && Application.isPlaying)
        {
            // Draw look direction
            Gizmos.color = Color.yellow;
            Gizmos.DrawRay(transform.position, lookDirection * 2f);

            // Draw line to mouse position
            Gizmos.color = Color.cyan;
            Gizmos.DrawLine(transform.position, worldMousePosition);

            // Draw mouse position as a small sphere
            Gizmos.color = Color.red;
            Gizmos.DrawWireSphere(worldMousePosition, 0.1f);
        }
    }
}
