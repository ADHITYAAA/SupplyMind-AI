class RegexUtils {

    static find(pattern, text) {

        const match = text.match(pattern);

        return match ? match[1].trim() : null;

    }

    static findAll(pattern, text) {

        return [...text.matchAll(pattern)];

    }

    static clean(value) {

        if (!value) return null;

        return value
            .replace(/\s+/g, " ")
            .replace(/\n/g, " ")
            .trim();

    }

}

export default RegexUtils;