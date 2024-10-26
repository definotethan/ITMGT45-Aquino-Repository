/**
 * Set 2
 *
 * This assignment will develop your proficiency with JS's control flows.
 */

/**
 * Shift letter
 *
 * Shift a letter right by the given number.
 * Wrap the letter around if it reaches the end of the alphabet.
 *
 * Examples
 * shiftLetter('A', 0) -> 'A'
 * shiftLetter('A', 2) -> 'C'
 * shiftLetter('Z', 1) -> 'A'
 * shiftLetter('X', 5) -> 'C'
 * shiftLetter(' ', _) -> ' '
 *
 * Note: we use the underscore _ to denote the presence of a value that is present but irrelevant.
 * 
 * @param {string} letter A single uppercase English letter, or a space
 * @param {Number} shift The number by which to shift the letter
 * @returns {string} The letter, shifted appropriately, if a letter, otherwise a space.
 */
function shiftLetter(letter, shift) {
    if (letter === ' ') return ' ';
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const index = alphabet.indexOf(letter); // making the letter into a number
    const newIndex = (index + shift) % 26; 
    return alphabet[newIndex];
  }
  
  
  /**
  * Caesar cipher
  *
  * Apply a shift number to a string of uppercase English letters and spaces.
  *
  * @param {string} message A string of uppercase English letters and/or spaces
  * @param {Number} shift The number by which to shift the letters
  * @returns {string} The message, shifted appropriately.
  */
  
  // AAABBC DEFG    SHIFT 1 -> BBBCCD EFGH
  
  function caesarCipher(message, shift) {
    // Normalize the shift to be within 0-25
    shift = shift % 26;
    let output = '';
  
  
    //AB C  SHIFT 1
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
  
        // Check if the character is an uppercase letter
        if (char >= 'A' && char <= 'Z') {
            // Shift the character and wrap around using modulo
            let shiftedChar = String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
            output += shiftedChar;
        } else if (char === ' ') {
            // Preserve spaces unchanged
            output += ' ';
        }
    }
  
    return output;
  }
  // unicode value 65-91
  // unicode 65 -> A unicode 66 -> B
  
  /**
   * Shift by letter
   *
   * Shift a letter to the right using the number equivalent of another letter.
   * The shift letter is any letter from A to Z, where A represents 0, B represents 1, ..., Z represents 25.
   *
   * Examples
   * shiftByLetter('A', 'A') -> 'A'
   * shiftByLetter('A', 'C') -> 'C'
   * shiftByLetter('B', 'K') -> 'L'
   * shiftByLetter(' ', _) -> ' '
   *
   * @param {string} letter A single uppercase English letter, or a space
   * @param {string} letterShift A single uppercase English letter
   * @returns {string} The letter, shifted appropriately
   */
  function shiftByLetter(letter, letterShift) {
    // Check if the input is a space
    if (letter === ' ') {
        return ' '; // Preserve spaces unchanged
    }
  
    // Get the numeric value of the shift letter
    const shiftValue = letterShift.charCodeAt(0) - 'A'.charCodeAt(0); // Convert to numeric (0-25)
    //                      unicode 67          - unicode 65  = 2
  
    // Get the numeric value of the original letter
    const originalValue = letter.charCodeAt(0) - 'A'.charCodeAt(0); // Convert to numeric (0-25)
    //                      unicode 65 - unicode 65 = 0
  
    // Calculate the new shifted value and wrap around using modulo 26
    const newValue = (originalValue + shiftValue) % 26;
    // newValue =  (0 + 2) % 26
  
    // Convert back to a character
    return String.fromCharCode(newValue + 'A'.charCodeAt(0));
    // fromCharCode(2 + unicode value 65) -> fromcharcode(67) -> C
  }
  
  
  /**
  * Vigenere cipher
  *
  * Encrypt a message using a keyphrase instead of a static number.
  * Every letter in the message is shifted by the number represented by the respective letter in the key.
  * Spaces are ignored.
  *
  * Example
  * vigenereCipher('A C', 'KEY') -> 'K A'
  *
  * If needed, the keyphrase is extended to match the length of the key.
  * If the key is 'KEY' and the message is 'LONGTEXT', the key will be extended to 'KEYKEYKE'.
  *
  * @param {string} message A string of uppercase English letters and/or spaces
  * @param {string} key A string of uppercase English letters, no spaces. Will not exceed the length of the message.
  * @returns {string} The message, shifted appropriately
  */
  
  // message - A B C | key - D E F || A D  B E  C F || 0 shift -> 3  || B E  b shift 4 
  
  // A B C key D E F 
  // 'A' position 0 -> i < 5 -> +1 i at the end
  // 'D' get the unicode value - 65 --> SHIFT
  // unicode of 'A' - 65 + 3 ) 26) + 65
  // string.fromCharCode(68) = D
  // " " -> " " + 'D' = "D"
  // keyindex ++ 1 = 0
  
  
  function vigenereCipher(message, key) {
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < message.length; i++) {
      const char = message[i]; //A
      
      if (char === ' ') {
        result += ' ';
        keyIndex++;
      } else {
        // Get the shift value from the key
        const shift = key[keyIndex % key.length].charCodeAt(0) - 'A'.charCodeAt(0);
        
        // Shift the character
        const shiftedChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0));
        
        result += shiftedChar;
        keyIndex++;
      }
    }
    
    return result;
  }
  
  /**
  * Scytale cipher
  *
  * Encrypts a message by simulating a scytale cipher.
  *
  * A scytale is a cylinder around which you can wrap a long strip of
  *      parchment that contained a string of apparent gibberish. The parchment,
  *      when read using the scytale, would reveal a message due to every nth
  *      letter now appearing next to each other, revealing a proper message.
  * This encryption method is obsolete and should never be used to encrypt
  *      data in production settings.
  *
  * You may read more about the method here:
  *      https://en.wikipedia.org/wiki/Scytale
  *
  * You may follow this algorithm to implement a scytale-style cipher:
  * 1. Take a message to be encoded and a "shift" number.
  *      For this example, we will use "INFORMATION_AGE" as
  *      the message and 3 as the shift.
  * 2. Check if the length of the message is a multiple of
  *      the shift. If it is not, add additional underscores
  *      to the end of the message until it is.
  *      In this example, "INFORMATION_AGE" is already a multiple of 3,
  *      so we will leave it alone.
  * 3. This is the tricky part. Construct the encoded message.
  *      For each index i in the encoded message, use the character at the index
  *      (i // shift) + (len(message) // shift) * (i % shift) of the raw message.
  *      If this number doesn't make sense, you can play around with the cipher at
  *       https://dencode.com/en/cipher/scytale to try to understand it.
  * 4. Return the encoded message. In this case,
  *      the output should be "IMNNA_FTAOIGROE".
  *
  * Example
  * scytaleCipher('INFORMATION_AGE', 3) -> 'IMNNA_FTAOIGROE'
  * scytaleCipher('INFORMATION_AGE', 4) -> 'IRIANMOGFANEOT__'
  * scytaleCipher('ALGORITHMS_ARE_IMPORTANT', 😎 -> 'AOTSRIOALRH_EMRNGIMA_PTT'
  *
  * @param {string} message A string of uppercase English letters and underscores. Underscores represent spaces.
  * @param {number} shift A positive integer that does not exceed the length of the message
  */
  function scytaleCipher(message, shift) {
    // Step 1: Ensure length of message is a multiple of shift
    while (message.length % shift !== 0) {
        message += '_'; // Append underscores until it's a multiple
    } // message.lengthintial 9 shift 4
      // ++___ message -> multiple of 4 
      // message.lenghtfin -> 12
  
    // Step 2: Initialize an empty result string for encoded message
    let result = '';
  
    // Step 3: Construct encoded message using Scytale cipher logic
    const numRows = message.length / shift; // Calculate number of rows
  
    for (let i = 0; i < message.length; i++) {
        // Calculate original index based on Scytale cipher rules
        const originalIndex = Math.floor(i / shift) + numRows * (i % shift);
        result += message[originalIndex]; // Append character from original position
    }
  
    return result; // Return the encoded message
  }
  
  /**
  * Scytale decipher
  *
  * Decrypts a message that was originally encrypted with the scytaleCipher function above.
  *
  * Example:
  * scytaleDecipher('IMNNA_FTAOIGROE', 3) -> 'INFORMATION_AGE'
  * scytaleDecipher('AOTSRIOALRH_EMRNGIMA_PTT', 😎 -> 'ALGORITHMS_ARE_IMPORTANT'
  * scytaleDecipher('IRIANMOGFANEOT__', 4) -> 'INFORMATION_AGE_'
  *
  * @param {string} message A string of uppercase English letters and underscores. Underscores represent spaces.
  * @param {Number} shift A positive integer that does not exceed the length of the message
  */
  function scytaleDecipher(encodedMessage, shift) {
    const numRows = Math.ceil(encodedMessage.length / shift);
    let result = '';
    for (let i = 0; i < encodedMessage.length; i++) {
        const originalIndex = Math.floor(i % numRows) * shift + Math.floor(i / numRows);
        result += encodedMessage[originalIndex]; 
    }
  
    return result; 
  }