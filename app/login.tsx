import { useAuth } from '@/components/authProvider';
import { Color } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

export default function Login() {
    const { login, loading } = useAuth();
    const [key, setKey] = useState('');
    const canSubmit = key.trim().length > 0;
    const router = useRouter();
    const submit = async () => {
        if (!canSubmit) return;
        if(await login("NX61QS4D8HTPCLJESTXT1JGMFG6QVEZ3YW29Y1P9EKHSKL07A")){
            router.replace("/");
        }
        else{
            Alert.alert("Invalid api key");
        }
    };

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.screen}
    >
        <View style={styles.form}>
        <Text style={styles.title}>Enter your API key</Text>
        <TextInput
            value={key}
            onChangeText={setKey}
            onSubmitEditing={submit}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            returnKeyType="done"
            style={styles.input}
        />

        <Pressable
            accessibilityRole="button"
            disabled={!canSubmit}
            onPress={submit}
            style={({ pressed }) => [
            styles.button,
            !canSubmit && !loading && styles.buttonDisabled,
            pressed && canSubmit && styles.buttonPressed,
            ]}
        >
            <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: Color.background,
    },
    form: {
        gap: 16,
        padding: 24,
        backgroundColor: Color.secondary,
        borderWidth: 1,
        borderColor: Color.border,
        borderRadius: 12,
    },
    title: {
        color: Color.text,
        fontSize: 24,
        fontWeight: '700',
    },
    description: {
        color: Color.borderSelected,
        fontSize: 15,
        lineHeight: 22,
    },
    input: {
        height: 50,
        paddingHorizontal: 14,
        color: Color.text,
        backgroundColor: Color.background,
        borderWidth: 1,
        borderColor: Color.borderSelected,
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.text2,
        borderRadius: 8,
    },
    buttonDisabled: {
        opacity: 0.4,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonText: {
        color: Color.background,
        fontSize: 16,
        fontWeight: '700',
    },
});
