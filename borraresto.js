    /* <View style={styles.wrapper}>
      <Text style={styles.title}>
        QR Code Generator
      </Text>
      <Text style={styles.description}>
        Paste a URL or enter text to create a QR code
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text or URL"
        value={qrValue}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={generateQRCode}
      >
        <Text style={styles.buttonText}>
          Generate QR Code
        </Text>
      </TouchableOpacity>
      {isActive && (
        <View style={styles.qrCode}>
          <QRCode
            value={qrValue}
            size={200}
            color="black"
            backgroundColor="white"
          />
        </View>
      )}
    </View> */