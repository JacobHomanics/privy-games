using UnityEngine;

public class CharacterSetup : MonoBehaviour
{
    [Header("Character Settings")]
    [SerializeField] private Sprite characterSprite;
    [SerializeField] private Color characterColor = Color.white;
    [SerializeField] private float characterScale = 1f;
    
    [Header("Physics Settings")]
    [SerializeField] private float mass = 1f;
    [SerializeField] private float linearDrag = 0f;
    [SerializeField] private float angularDrag = 0f;
    
    void Start()
    {
        SetupCharacter();
    }
    
    private void SetupCharacter()
    {
        // Add SpriteRenderer if not present
        SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer == null)
        {
            spriteRenderer = gameObject.AddComponent<SpriteRenderer>();
        }
        
        // Set sprite (use a default square if none provided)
        if (characterSprite == null)
        {
            // Create a simple colored square sprite
            Texture2D texture = new Texture2D(32, 32);
            Color[] pixels = new Color[32 * 32];
            for (int i = 0; i < pixels.Length; i++)
            {
                pixels[i] = characterColor;
            }
            texture.SetPixels(pixels);
            texture.Apply();
            
            characterSprite = Sprite.Create(texture, new Rect(0, 0, 32, 32), new Vector2(0.5f, 0.5f));
        }
        
        spriteRenderer.sprite = characterSprite;
        spriteRenderer.color = characterColor;
        
        // Set scale
        transform.localScale = Vector3.one * characterScale;
        
        // Add Rigidbody2D if not present
        Rigidbody2D rb = GetComponent<Rigidbody2D>();
        if (rb == null)
        {
            rb = gameObject.AddComponent<Rigidbody2D>();
        }
        
        // Configure Rigidbody2D
        rb.mass = mass;
        rb.linearDamping = linearDrag;
        rb.angularDamping = angularDrag;
        rb.gravityScale = 0f; // No gravity for top-down
        rb.freezeRotation = true;
        
        // Add BoxCollider2D if not present
        BoxCollider2D collider = GetComponent<BoxCollider2D>();
        if (collider == null)
        {
            collider = gameObject.AddComponent<BoxCollider2D>();
        }
        
        // Add the character controller script
        TopDownCharacterController controller = GetComponent<TopDownCharacterController>();
        if (controller == null)
        {
            controller = gameObject.AddComponent<TopDownCharacterController>();
        }
        
        Debug.Log("Character setup complete!");
    }
    
    // Method to change character appearance at runtime
    public void SetCharacterSprite(Sprite newSprite)
    {
        SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer != null)
        {
            spriteRenderer.sprite = newSprite;
        }
    }
    
    public void SetCharacterColor(Color newColor)
    {
        SpriteRenderer spriteRenderer = GetComponent<SpriteRenderer>();
        if (spriteRenderer != null)
        {
            spriteRenderer.color = newColor;
        }
    }
}
