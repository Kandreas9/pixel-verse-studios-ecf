<div>
    <p>
        {{ $reviewMessage }}
    </p>

    @if ($reviewReason !== '')
        <p>
            Reason: {{ $reviewReason }}
        </p>
    @endif
</div>
